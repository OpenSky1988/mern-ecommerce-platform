import colors from 'colors/safe';
import mongoose from 'mongoose';

const divider = colors.yellow('────────────────────────────────────────────────────────');

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log('\n' + divider);
    console.log(colors.red('DB connection successfull'));
    console.log(divider);
  })
  .catch((error: Error) => {
    console.log('\n' + divider);
    console.log(colors.red('DB connection error'));
    console.log(divider);
    console.log(`${colors.green('Error name:')} ${error.name}`);
    console.log(`${colors.green('Error message:')} ${error.message}`);
    console.log(divider);
    console.log(`${colors.green('Error stack:')} ${error.stack}`);
    console.log(divider);
  });

const MongoDB = mongoose.connection;

export default MongoDB;
