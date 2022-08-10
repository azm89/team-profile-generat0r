const Employee = require('../lib/Employee');
const Intern = require('../lib/Intern');

test('creates an intern object', () => {
    const intern = new Intern('Ashton');
});

test('set school with constructor', () => {
    const testValue = 'Harvard';
    const e = new Intern('Ashton', 1, 'intern@email.com', testValue);
    expect(e.school).toBe(testValue);
});

test('get school with getSchool()', () => {
    const testValue = 'Harvard';
    const e = new Intern('Ashton', 1, 'intern@email.com', testValue);
    expect(e.getSchool()).toBe(testValue);
});

test('getRole() return Intern()', () => {
    const testValue = 'Intern';
    const e = new Intern('Ashton', 1, 'intern@email.com', 'Harvard');
    expect(e.getRole()).toBe(testValue);
});