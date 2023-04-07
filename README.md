# Minecraft World Backup Script

This script is designed to backup your Minecraft world to a AWS S3 bucket. 

## Setup

Set the following environment variables:

```
AWS_ACCESS_KEY_ID=
AWS_BUCKET_NAME=your-minecraft-backup
AWS_REGION=ap-northeast-1
AWS_SECRET_ACCESS_KEY=
SOURCE_DIR=world
TIME_ZONE=Asia/Tokyo
```

## Usage

```console
deno run --allow-net --allow-env --allow-read --allow-write --allow-run --unstable https://raw.githubusercontent.com/HosokawaR/minecraft-world-backup-script/main/main.ts
```
