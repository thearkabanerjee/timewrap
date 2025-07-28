#!/usr/bin/env node

import readline from 'node:readline';
import chalk from 'chalk';
import boxen from 'boxen';
import dayjs from 'dayjs';

// === LIFE MODES ===
const MODES = {
  student: { sleep: 7, screen: 4 },
  hustler: { sleep: 5, screen: 2 },
  monk: { sleep: 8, screen: 0 }
};

// === CLI Input Setup ===
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const ask = (q) => new Promise((res) => rl.question(q, res));

// === Main Logic ===
(async () => {
  console.log(chalk.cyan.bold("\n⏳ Timewrap – Visualize Your Life in Time\n"));

  let modeChoice = await ask("Pick a mode (student/hustler/monk/custom): ");
  modeChoice = modeChoice.trim().toLowerCase();

  let sleep, screen;
  if (MODES[modeChoice]) {
    ({ sleep, screen } = MODES[modeChoice]);
    console.log(chalk.green(`\n✔ Mode '${modeChoice}' selected. Sleep: ${sleep}h, Screen: ${screen}h`));
  } else {
    sleep = 7;
    screen = 4;
  }

  // Ask for overrides
  const sleepInput = await ask(`Enter avg sleep per day (hrs) [Press Enter to keep ${sleep}]: `);
  if (sleepInput.trim() !== '') sleep = parseFloat(sleepInput);

  const screenInput = await ask(`Enter avg screen time per day (hrs) [Press Enter to keep ${screen}]: `);
  if (screenInput.trim() !== '') screen = parseFloat(screenInput);

  const dob = await ask("Enter your birthdate (YYYY-MM-DD): ");
  rl.close();

  // === Calculations ===
  const now = dayjs();
  const birthDate = dayjs(dob);
  const ageDays = now.diff(birthDate, 'day');
  const maxDays = 90 * 365;
  const daysLeft = maxDays - ageDays;

  const sleepDays = (sleep / 24) * ageDays;
  const screenDays = (screen / 24) * ageDays;
  const freeDays = ageDays - sleepDays - screenDays;
  const pctUsed = ((ageDays / maxDays) * 100).toFixed(1);

  // === ASCII Life Bar ===
  const totalBlocks = 30;
  const filledBlocks = Math.floor((ageDays / maxDays) * totalBlocks);
  const lifeBar = chalk.cyan("[" + "█".repeat(filledBlocks) + "-".repeat(totalBlocks - filledBlocks) + `] ${pctUsed}%`);

  // === Main Output Box ===
  const output = `
   Age:         ${chalk.yellow((ageDays / 365).toFixed(1))} years
   Lived:       ${ageDays} days
   Remaining:   ${daysLeft} days

   Slept:       ${sleepDays.toFixed(0)} days
   Screen Time: ${screenDays.toFixed(0)} days
   Free Time:   ${freeDays.toFixed(0)} days

${lifeBar}
`;

  console.log(boxen(output, {
    padding: 1,
    borderColor: "cyan",
    borderStyle: "round"
  }));

  // === Good Habits Reward Messages ===
  if (sleep >= 6 && sleep <= 8 && screen <= 2) {
    console.log(chalk.green.bold("✅ You're on track to win at life. Keep going.\n"));
  }

  if (screen <= 1) {
    console.log(chalk.blue.bold("🧘 You're living like a monk. That’s rare. Stay sharp.\n"));
  }

  // === Regret Estimator ===
  const extraScreenHrs = screen - 1;
  const regretYears = ((extraScreenHrs / 24) * daysLeft / 365).toFixed(1);
  if (extraScreenHrs > 0) {
    console.log(chalk.red(`⚠️  Cut screen time to 1hr/day and gain ~${regretYears} more years of life.`));
  }

  // === Skill Investment Estimator ===
  const investTime = 1; // 1 hour/day learning
  const skillHours = Math.floor((investTime / 24) * daysLeft);
  console.log(chalk.green(`💡 Use 1hr/day to learn something & gain ~${skillHours} hours & ${Math.floor(skillHours / 1000)} whole god damn skill before you age 90.\n`));
})();
