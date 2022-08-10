const Employee = require("../lib/Employee");
const Manager = require("../lib/Manager");

test('creates a manager object', () => {
    const manager = new Manager('Ashton');
});

test('set office number with constructor', () => {
    const testValue = 100;
    const e = new Manager('Ashton', 1, 'manager@email.com', testValue);
    expect(e.officeNumber).toBe(testValue);
});

test('get office number with getOfficeNumber()', () => {
    const testValue = 100;
    const e = new Manager('Ashton', 1, 'manager@email.com', 100);
    expect(e.getOfficeNumber()).toBe(testValue);
});

test('getRole() return Manager', () => {   
    const testValue = 'Manager';
    const e = new Manager('Ashton', 1, 'manager@email.com', 100);
    expect(e.getRole()).toBe(testValue);
});