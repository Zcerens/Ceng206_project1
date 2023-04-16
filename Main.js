// import * as objects from './Objects.js';
// require("./Objects.js");
// function require(script) {
//     $.ajax({
//         url: script,
//         dataType: "script",
//         async: false,           
//         success: function () {
//             //Başarılı
//         },
//         error: function () {
//             throw new Error("Dosya yüklenemedi " + script);
//         }
//     });
// }
class Course {
    constructor(code, name, year, credit, compulsary_elective, department_service, instructor) {
    this._code = code;
    this._name = name;
    this._year = year;
    this._credit = credit;
    this._compulsary_elective = compulsary_elective;
    this._department_service = department_service;
    this._instructor = instructor;
    this._hasRoom = false;
    }
    setRoom() {
        this._hasRoom = true;
    }
    
    setEmpty() {
        this._hasRoom = false;
    }
    
    toString() {
        return this._code;
    }
    
    }
    class Instructor {
        constructor(name) {
        this._name = name;
        this._busy_time = [];
        }
        setBusyTime(day, time) {
            this._busy_time.push(new BusyTime(day, time));
        }
        
        isBusy(day, time) {
            for (let b of this._busy_time) {
                if (b._day === day && b._time === time) {
                    return true;
                }
            }
            return false;
        }
        
        toString() {
            return this._name;
        }
    }
    class BusyTime {
        constructor(day, time) {
        this._day = day;
        this._time = time;
        }
        }
        
        class Schedule {
        constructor(bigRoom, smallRoom) {
        this.schedule_table = {
        "Monday": {"Morning": [], "Afternoon": []},
        "Tuesday": {"Morning": [], "Afternoon": []},
        "Wednesday": {"Morning": [], "Afternoon": []},
        "Thursday": {"Morning": [], "Afternoon": []},
        "Friday": {"Morning": [], "Afternoon": []}
        };
        this._bigRoom = bigRoom;
        this._smallRoom = smallRoom;
        this.used_bigRooms = {
        "Monday": {"Morning": 0, "Afternoon": 0},
        "Tuesday": {"Morning": 0, "Afternoon": 0},
        "Wednesday": {"Morning": 0, "Afternoon": 0},
        "Thursday": {"Morning": 0, "Afternoon": 0},
        "Friday": {"Morning": 0, "Afternoon": 0}
        };
        this.used_smallRooms = {
        "Monday": {"Morning": 0, "Afternoon": 0},
        "Tuesday": {"Morning": 0, "Afternoon": 0},
        "Wednesday": {"Morning": 0, "Afternoon": 0},
        "Thursday": {"Morning": 0, "Afternoon": 0},
        "Friday": {"Morning": 0, "Afternoon": 0}
        };
        }
        hasBigRoom(day, time) {
            if (this.used_bigRooms[day][time] < this._bigRoom) {
                return true;
            }
            return false;
        }
        
        hasSmallRoom(day, time) {
            if (this.used_smallRooms[day][time] < this._smallRoom) {
                return true;
            }
            return false;
        }
        
        addToSchedule(code, roomSize, day, time) {
            let room;
            if (roomSize === "bigRoom") {
                this.used_bigRooms[day][time] += 1;
                room = (roomSize + this.used_bigRooms[day][time]);
            } else {
                this.used_smallRooms[day][time] += 1;
                room = (roomSize + this.used_smallRooms[day][time])
                this.schedule_table[day][time].append(ScheduleFormat(code, room, day, time))
            }
        }
        display() {
            const days = ["Monday","Tuesday", "Wednesday", "Thursday", "Friday"];
          
            for (let day of days) {
              for (let s of this.schedule_table[day]["Morning"]) {
                s.display();
              }
              for (let s of this.schedule_table[day]["Afternoon"]) {
                s.display();
              }
              console.log("****************************************");
            }
          }
        }

        class ScheduleFormat {
            constructor(code, room, day, time) {
                this._day = day; // day and time
                this._time = time;
                this._code = code; // course code
                this._room = room; // big or small with index 
            }
        
            display() {
                console.log(this._day + " " + this._time + " " + this._room + " " + this._code);
            }
        
            replace(code) {
                this._code = code;
            }
        }

let department_courses = [];  // list of all department courses
let service_courses = [];  // list of all service courses
let instructor_list = [];  // list of all instructors with their busy times

// time formats: 
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const times = ["Morning", "Afternoon"];

function find(liste, name) {  // boolean
    for (let obj of liste) {
        if (obj.toString() === name) {
            return true;
        }
    }
    return false;
}

function find_obj(liste, name) {  
    for (let obj of liste) {
        if (obj.toString() === name) {
            return obj;
        }
    }
}

// take courses. separate them into 2 groups: D and S
//Course.csv için ayırma
document.addEventListener('DOMContentLoaded', function() { // DOMContentLoaded olayını dinleyin
    document.getElementById('fileInput').addEventListener('change', async function(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
  
      reader.onload = async function(e) {
        console.log("d dfsd:")
        const csvData = e.target.result;
        console.log(csvData)
        const csv_rows = csvData.split('\n');
        console.log(csv_rows)
        console.log(csv_rows.length)
  
        for (let i = 0; i < csv_rows.length; i++) {
            console.log("fora gridi:")
            console.log(i)
          const row = csv_rows[i].split(';');
          if (find(instructor_list, row[6]) === false) {  // no duplicate instructor
            // let inst = ;
            console.log(new Instructor(row[6]));
            instructor_list.push(new Instructor(row[6]));
          } else {
            inst = find_obj(instructor_list, row[6]);
          }
          if (row[5] === "D") {  // department course
            department_courses.push(new Course(row[0], row[1], row[2], row[3], row[4], row[5], new Instructor(row[6])));
          } else {  // service course
            service_courses.push(new Course(row[0], row[1], row[2], row[3], row[4], row[5], new Instructor(row[6])));
          }
        }
        console.log("Csv dataam:")
        console.log(csvData)
      };
  
      reader.readAsText(file);
      alert("excele girdi")
      console.log(file)
      console.log(department_courses)
      
    });  
  });
  

// document.getElementById('fileInput').addEventListener('change', async function(event) {
//     const file = event.target.files[0];
//     const reader = new FileReader();
  
//     reader.onload = async function(e) {
//       const csvData = e.target.result;
//       const csv_rows = csvData.split('\n');
  
//       for (let i = 0; i < csv_rows.length; i++) {
//         const row = csv_rows[i].split(';');
//         if (find(instructor_list, row[6]) === false) {  // no duplicate instructor
//           let inst = new objects.Instructor(row[6]);
//           instructor_list.push(inst);
//         } else {
//           let inst = find_obj(instructor_list, row[6]);
//         }
//         if (row[5] === "D") {  // department course
//           department_courses.push(new objects.Course(row[0], row[1], row[2], row[3], row[4], row[5], inst));
//         } else {  // service course
//           service_courses.push(new objects.Course(row[0], row[1], row[2], row[3], row[4], row[5], inst));
//         }
//       }
//     };
    
//     reader.readAsText(file);
//   });

// (async function() {

    
//     const response = await fetch('tables/Courses.csv');
//     const data = await response.text();
//     const csv_rows = data.split('\n');
//     console.log(data)
    
//     for (let i = 0; i < csv_rows.length; i++) {
//         const row = csv_rows[i].split(';');
//         if (find(instructor_list, row[6]) === false) {  // no duplicate instructor
//             let inst = new objects.Instructor(row[6]);
//             instructor_list.push(inst);
//         } else {
//             let inst = find_obj(instructor_list, row[6]);
//         }
//         if (row[5] === "D") {  // department course
//             department_courses.push(new objects.Course(row[0], row[1], row[2], row[3], row[4], row[5], inst));
//         } else {  // service course
//             service_courses.push(new objects.Course(row[0], row[1], row[2], row[3], row[4], row[5], inst));
//         }
//     }
// })();

// take busy time
// (async function() {
//     const response = await fetch('tables/busy.csv');
//     const data = await response.text();
//     const csv_rows = data.split('\n');
    
//     for (let i = 0; i < csv_rows.length; i++) {
//         const row = csv_rows[i].split(';');
//         if (find(instructor_list, row[0])) {  // if there is instructor with that name
//             find_obj(instructor_list, row[0]).setBusyTime(row[1], row[2]); 
//         }
//     }
// })();

// let bigRoom = 0;  // number of big rooms
// let smallRoom = 0;  // number of small rooms

// (async function() {
//     const response = await fetch('tables/classroom.csv');
//     const data = await response.text();
//     const csv_rows = data.split('\n');
    
//     for (let i = 0; i < csv_rows.length; i++) {
//         const row = csv_rows[i].split(';');
//         if (row[0] === "big") {
//             bigRoom = parseInt(row[1]);
//         } else if (row[0] === "small") {    
//             smallRoom = parseInt(row[1]);
//         }
//     }
// })();

console.log("burda")

