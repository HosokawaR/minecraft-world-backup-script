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

### One Shot

```console
deno run --allow-net --allow-env --allow-read --allow-write --allow-run --unstable https://raw.githubusercontent.com/HosokawaR/minecraft-world-backup-script/main/main.ts
```

### Cron

Set the following cron job with `crontab -e`.

NOTE:

 - You may need to restart cron service with `sudo systemctl restart cron` if you set the timezone.
 - You may need to add permission to the log file with `sudo chmod <PREMISSION> /var/log/<YOUR LOG FILE>.log` if you set the log file.

```console
TZ=Asia/Tokyo

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=ap-northeast-1
TIME_ZONE=Asia/Tokyo
AWS_BUCKET_NAME=
SOURCE_DIR=<FULL PATH TO SOURCE>

* 6 * * * <FULL PATH TO deno> run --allow-net --allow-env --allow-read --allow-write --allow-run --unstable https://raw.githubusercontent.com/HosokawaR/minecraft-world-backup-script/main/main.ts >> /var/log/<YOUR LOG FILE>.log 2>&1
```
