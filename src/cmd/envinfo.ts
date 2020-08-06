import envinfo from 'envinfo';
import { info, error } from '@/utils/message';

export default async (): Promise<any> => {
  try {
    info('Environment Info:');
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
    console.info(res);
  } catch (err) {
    error(err);
    process.exit(1);
  }
};
