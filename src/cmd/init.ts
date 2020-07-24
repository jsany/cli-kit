import message from '@/utils/message';
import selectTemplate from '@/utils/template';
import checkDir from '@/utils/checkDir';

export default async function init(projectName: string | undefined) {
  try {
    const { pass, toPath } = await checkDir(projectName);
    if (pass) {
      await selectTemplate(toPath);
    } else {
      process.exit(1);
    }
  } catch (error) {
    message.error(error);
    process.exit(1);
  }
}
