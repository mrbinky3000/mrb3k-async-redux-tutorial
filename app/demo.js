/* @flow */
function add(x: number, y: number): number
{
	return x + y;
}

add(2, 4);

/* this shouldn't be valid as per function definition! */
// add('foo', 'bar');
