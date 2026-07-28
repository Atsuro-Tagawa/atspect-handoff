# -*- coding: utf-8 -*-
r"""
番号付き入稿ファイルの自動生成スクリプト（2026-07-29・営業戦略T作成）

目的：
未番号ソース（登録申込書_F02A/B・契約規約書_F03/F03携行用の各"_修正版"PDF）が更新されたとき、
対応する番号付き提出用ファイル（02/03/06/07）へ手動コピーする運用をやめ、本スクリプトで
自動生成する。生成後にページ数・版表記を自動検証し、ソースと不一致なら停止する（＝旧版が
そのまま提出されてしまう2026-07-28の事故の再発防止）。

使い方：
    python gen_numbered_files.py

このフォルダ（_入稿データ_アクセア_修正版_20260724）内で実行する前提。
バックアップは自動（実行のたびに _backups\<実行日時>_gen_numbered\ へ、上書き対象の
既存ファイルを退避してから生成する）。

対象範囲：
現時点で「未番号ソース→番号付き提出用ファイル」という単純なコピー関係にあるのは
F02-A/F02-B/F03/F03携行用の4点のみ（04=AR-P1・05=AR-P2は対応する未番号ソースが
存在しない単一ファイル、01(→23)=パンフ・08=入稿依頼メモは別の生成経路のため対象外。
詳細は fix-log2.md 手順3参照）。
"""
import fitz
import hashlib
import re
import shutil
import sys
from pathlib import Path
from datetime import datetime

HERE = Path(__file__).resolve().parent

# (番号付き提出用ファイル名, 未番号ソースファイル名)
PAIRS = [
    ("02_登録申込書_F02-A_修正版.pdf", "登録申込書_F02A_20260724_修正版.pdf"),
    ("03_登録申込書_F02-B_修正版.pdf", "登録申込書_F02B_20260724_修正版.pdf"),
    ("06_契約規約書_F03_修正版.pdf", "契約規約書_F03_20260724_修正版.pdf"),
    ("07_契約規約書_F03_携行用_リング製本_修正版.pdf", "契約規約書_F03_携行用_20260724_修正版.pdf"),
]


def pdf_signature(path):
    """ページ数・版表記文字列・MD5を返す。ファイルが無ければ None。"""
    if not path.exists():
        return None
    doc = fitz.open(str(path))
    pages = len(doc)
    text = doc[0].get_text()
    m = re.search(r"版[:：]\s*v[\d.]+[^\n]*", text)
    version = m.group(0) if m else None
    doc.close()
    md5 = hashlib.md5(path.read_bytes()).hexdigest()
    return {"pages": pages, "version": version, "md5": md5}


def main():
    run_id = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_dir = HERE / "_backups" / f"{run_id}_gen_numbered"

    results = []
    halted = False

    for numbered_name, source_name in PAIRS:
        numbered_path = HERE / numbered_name
        source_path = HERE / source_name

        print(f"=== {numbered_name} ===")

        if not source_path.exists():
            print(f"  [ERROR] ソースが存在しません: {source_name}")
            results.append((numbered_name, "ERROR: ソースなし"))
            halted = True
            break

        source_sig = pdf_signature(source_path)

        # 自動バックアップ（既存の番号付きファイルがあれば退避してから上書き）
        if numbered_path.exists():
            backup_dir.mkdir(parents=True, exist_ok=True)
            backup_path = backup_dir / numbered_name
            shutil.copy2(numbered_path, backup_path)
            print(f"  バックアップ: {backup_path}")

        # 生成（コピー）
        shutil.copy2(source_path, numbered_path)
        print(f"  生成: {source_name} -> {numbered_name}")

        # 生成後の自動検証
        numbered_sig = pdf_signature(numbered_path)

        ok = (
            numbered_sig is not None
            and numbered_sig["pages"] == source_sig["pages"]
            and numbered_sig["version"] == source_sig["version"]
            and numbered_sig["md5"] == source_sig["md5"]
        )

        print(f"  ソース: pages={source_sig['pages']} version={source_sig['version']}")
        print(f"  生成後: pages={numbered_sig['pages']} version={numbered_sig['version']}")
        print(f"  MD5一致: {numbered_sig['md5'] == source_sig['md5']}")

        if ok:
            print("  [OK] 検証成功（ページ数・版表記・MD5すべて一致）")
            results.append((numbered_name, "OK"))
        else:
            print("  [FAIL] 検証失敗＝ソースと生成後の内容が一致しません。ここで停止します。")
            results.append((numbered_name, "FAIL"))
            halted = True
            break

    print()
    print("=== 結果一覧 ===")
    for name, status in results:
        print(f"  {status}: {name}")

    if halted:
        print()
        print("★停止しました。原因を確認してから再実行してください（自動生成は途中で止まっています）。")
        sys.exit(1)
    else:
        print()
        print("すべて成功しました。")
        sys.exit(0)


if __name__ == "__main__":
    main()
