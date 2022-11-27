import fs from 'fs-extra';
import path from 'path';
import inquirer from 'inquirer';

const prompt = [
  {
    type: 'list',
    name: 'bundler',
    message: 'Vite or Webpack?',
    choices: ['vite', 'webpack'],
  },
  {
    type: 'confirm',
    name: 'lazy',
    message: 'With lazy loading?',
  },
  {
    type: 'number',
    name: 'components',
    message: 'How many components?',
  },
];

const answers = await inquirer.prompt(prompt);

const folderName = `./cases/${answers.bundler}/${answers.lazy ? 'lazy-' : ''}${answers.components}`;
if (fs.existsSync(folderName)) {
  throw new Error('Case already exists');
}

fs.copySync(`./templates/${answers.bundler}`, folderName);
fs.copySync(`./templates/app${answers.lazy ? '-lazy': ''}`, path.join(folderName, 'src'));

const getImportStatement = (i) => `import Component${i} from './Component${i}';`;
const getRenderStatement = (i) => `<Component${i} />`;

let imports = '';
let renders = '';

for (let i = 0; i < answers.components; i++) {
  fs.copySync(`./templates/component`, path.join(folderName, `src/components/Component${i}`));
  imports += getImportStatement(i) + '\n';
  renders += getRenderStatement(i) + '\n';
}

let entryText = fs.readFileSync('./templates/entry/Entry.tsx', 'utf8');
entryText = entryText.replace('__IMPORT__', imports);
entryText = entryText.replace('__RENDER__', renders);
fs.writeFileSync(path.join(folderName, `src/components/Entry.tsx`), entryText);

console.log('Done')