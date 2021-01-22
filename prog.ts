import { confirm } from './lib';

do
	alert('Hello ' + prompt('What is your name?'));
while(confirm('Again?', false));
