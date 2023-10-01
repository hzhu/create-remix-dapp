#!/usr/bin/env node

import chalk from "chalk";
import * as path from "path";
import { writeFileSync } from "fs";
import { execSync } from "child_process";
import { input } from "@inquirer/prompts";

async function main() {
	const projectName = await input({
		message: chalk.green(
			"💿 Let's create a new Remix starter dApp! What is the name of your project?"
		),
	});

	const projectPath = path.resolve(projectName);

	const repositoryUrl = "https://github.com/hzhu/remix-dapp.git";

	execSync(`git clone ${repositoryUrl} ${projectPath}`, { stdio: "inherit" });

	process.chdir(projectName);

	// Create and populate `.env` file for easy-of-onboarding.
	const envFilePath = path.resolve(".", ".env");

	const variableString = `# For production usage, please replace the WalletConnect projectId with your own.\n# See: https://www.rainbowkit.com/docs/migration-guide#2-supply-a-walletconnect-cloud-projectid\nWALLET_CONNECT_PROJECT_ID=b9a4bde6ce600ad8699dab53a7e36519\n`;

	writeFileSync(envFilePath, variableString);

	execSync("npm install", { stdio: "inherit" });

	console.log(
		chalk.green(
			`\n🎉 A new Remix dApp, ${chalk.magenta(
				projectName
			)}, has been successfully created in the current directory! 🎉\nSee the README.md to get started.`
		)
	);
}

main();
