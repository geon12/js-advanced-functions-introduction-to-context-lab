// Your code here
function createEmployeeRecord(employee) {

    const employeeRecord = {};
    employeeRecord.firstName = employee[0];
    employeeRecord.familyName = employee[1];
    employeeRecord.title = employee[2];
    employeeRecord.payPerHour = employee[3];

    employeeRecord.timeInEvents = [];
    employeeRecord.timeOutEvents = [];

    return employeeRecord;
}

function createEmployeeRecords(employees) {
    return employees.map(createEmployeeRecord);
}

function createTimeInEvent(employeeRecord,dateStamp) {
    const dateAndHour = dateStamp.split(" ");
    const timeIn = {
        "type": "TimeIn",
        "hour": parseInt(dateAndHour[1],10),
        "date": dateAndHour[0]
    };
    employeeRecord.timeInEvents.push(timeIn);
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord,dateStamp) {
    const dateAndHour = dateStamp.split(" ");
    const timeOut = {
        "type": "TimeOut",
        "hour": parseInt(dateAndHour[1],10),
        "date": dateAndHour[0]
    };
    employeeRecord.timeOutEvents.push(timeOut);
    return employeeRecord;
}


function hoursWorkedOnDate(employeeRecord,date) {
    const matchedTimeIn = employeeRecord.timeInEvents.find((timeIn) => timeIn.date === date);
    const matchedTimeOut = employeeRecord.timeOutEvents.find((timeOut) => timeOut.date === date);
    return (matchedTimeOut.hour - matchedTimeIn.hour)/100;
}

function wagesEarnedOnDate(employeeRecord,date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord,date);
    return hoursWorked * employeeRecord.payPerHour;
}

function allWagesFor(employeeRecord) {
    const dates = employeeRecord.timeInEvents.map((timeIn) => timeIn.date);
    const totalWages = dates.reduce((total, date) => total + wagesEarnedOnDate(employeeRecord,date) , 0);
    return totalWages;
}

function findEmployeeByFirstName(employeeRecords, firstName) {
    return employeeRecords.find((record) => record.firstName === firstName);
}

function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total,record) => total + allWagesFor(record), 0)
}