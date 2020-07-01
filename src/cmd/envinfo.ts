import envinfo from 'envinfo';
import message from '@/utils/message';

export default async function () {
  try {
    message.info('Environment Info:');
    const res = await envinfo.run(
      {
        System: ['OS', 'CPU'],
        Binaries: ['Node', 'Yarn', 'npm'],
        Browsers: ['Chrome', 'Edge', 'Firefox', 'Safari']
      },
      {
        showNotFound: true,
        duplicates: true,
        fullTree: true
      }
    );
    console.log(res);
  } catch (error) {
    message.error(error);
    process.exit(1);
  }
}
