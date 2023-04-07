import { compress } from "https://deno.land/x/zip@v1.2.5/mod.ts";
import { S3, S3Object } from "https://deno.land/x/s3@0.5.0/mod.ts";
import { datetime } from "https://deno.land/x/ptera@v1.0.2/mod.ts";

const sourceDir = Deno.env.get("SOURCE_DIR");
const awsAccessKeyId = Deno.env.get("AWS_ACCESS_KEY_ID");
const awsSecretAccessKey = Deno.env.get("AWS_SECRET_ACCESS_KEY");
const awsRegion = Deno.env.get("AWS_REGION");
const timeZone = Deno.env.get("TIME_ZONE");
const bucketName = Deno.env.get("AWS_BUCKET_NAME");

if (
  !sourceDir || !awsAccessKeyId || !awsSecretAccessKey || !awsRegion ||
  !timeZone || !bucketName
) {
  console.error("Some environment variables are missing.");
  Deno.exit(1);
}

const s3 = new S3({
  accessKeyID: awsAccessKeyId,
  secretKey: awsSecretAccessKey,
  region: awsRegion,
});

const bucket = s3.getBucket(bucketName);

const uploadToS3 = async (fileName: string) => {
  const fileContent = Deno.readFileSync(fileName);
  const result = await bucket.putObject(fileName, fileContent);
  console.log(`UPLOADED: ${result.etag}`);
};

const getFilename = () => {
  const jpTime = datetime().toZonedTime(timeZone).format("YYYY_MM_dd_HHmm_ss");
  return `minecraft_data_${jpTime}.zip`;
};

const compressAndUpload = async () => {
  const fileName = getFilename();
  await compress(sourceDir, fileName);
  await uploadToS3(fileName);
  await Deno.remove(fileName);
};

const NUMBER_OF_REMAINING = 10;

const deleteOldFiles = async () => {
  const result = await bucket.listObjects();
  const objects = result?.contents?.filter(
    (object): object is S3Object & {
      lastModified: Date;
    } => object.lastModified !== undefined,
  ) ?? [];

  const deleteTargets = objects.sort(
    (a, b) => b.lastModified.getTime() - a.lastModified.getTime(),
  ).slice(NUMBER_OF_REMAINING);

  if (deleteTargets.length === 0) return;

  for (const target of deleteTargets) {
    if (!target.key) continue;
    bucket.deleteObject(target.key);
    console.log(` DELETED: ${target.key} (${target.eTag})`);
  }
};

const main = async () => {
  try {
    await compressAndUpload();
    await deleteOldFiles();
  } catch (e) {
    console.error(e);
  }
};

await main();
