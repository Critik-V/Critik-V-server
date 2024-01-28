/**
 * this file is used to create a logger instance
 */

// ---------------------- IMPORTS ---------------------- //
import chalk from 'chalk';

// ---------------------- TYPE DEFINITIONS ---------------------- //
type loggerType = () => void;
interface loggerInterface {
	successDbLogger: loggerType;
	errorDbLogger: loggerType;
	successServerLogger: loggerType;
	errorServerLogger: loggerType;
}
// ---------------------- MAIN ---------------------- //
const table = (name: string, message: string, status: string): string =>
	` ${name} | ${message} | ${status} `;

// fonction who display when the database is connected
const successDbLogger: loggerType = (): void =>
	console.log(
		chalk.bgGreenBright(
			table(
				chalk.bgGray(chalk.bold(' Database ')),
				chalk.green(`Database is connected`),
				'✅'
			)
		)
	);

// fonction who display when the database fail to connect
const errorDbLogger: loggerType = (): void =>
	console.log(chalk.red(table('Database', 'Database is not connected', '❌')));

// fonction who display when the server is running
const successServerLogger: loggerType = (): void =>
	console.log(
		table(
			chalk.bgGray(chalk.bold(' Server ')),
			`Server is running on ${chalk.blue(process.env.API_ORIGIN)}`,
			'✅'
		)
	);
// fonction who display when the server fail to run
const errorServerLogger: loggerType = (): void =>
	console.log(chalk.red(table('Server', 'Server is not running', '❌')));

const logger: loggerInterface = {
	successDbLogger,
	errorDbLogger,
	successServerLogger,
	errorServerLogger,
};

// ---------------------- EXPORTS ---------------------- //
export default logger;
