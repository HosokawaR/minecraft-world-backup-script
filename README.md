# Minecraft World Backup Script

This script is designed to backup your Minecraft world to a AWS S3 bucket. 

## Setup

Set the following environment variables:

```
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=ap-northeast-1
TIME_ZONE=Asia/Tokyo
AWS_BUCKET_NAME=your-minecraft-backup
SOURCE_DIR=world
```

## Usage

```console
deno run --allow-net --allow-env --allow-read --allow-write --unstable https://raw.githubusercontent.com/HosokawaR/minecraft-backup-script/main/main.ts
```
