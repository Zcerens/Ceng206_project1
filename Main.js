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
    constructor(code, name, year, credit, compulsary_elective, department_service, capacity, instructor) {
        this._code = code;
        this._name = name;
        this._year = year;
        this._credit = credit;
        this._compulsary_elective = compulsary_elective;
        this._department_service = department_service;
        this._capacity = capacity;
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
    constructor(room1, room2, room3, room4) { //smaller to bigger
        this.schedule_table = {
            "Monday": { "Morning": [], "Afternoon": [] },
            "Tuesday": { "Morning": [], "Afternoon": [] },
            "Wednesday": { "Morning": [], "Afternoon": [] },
            "Thursday": { "Morning": [], "Afternoon": [] },
            "Friday": { "Morning": [], "Afternoon": [] }
        };
        this._room1 = room1;
        this._room2 = room2;
        this._room3 = room3;
        this._room4 = room4;

        this.used_room1 = {
            "Monday": { "Morning": 0, "Afternoon": 0 },
            "Tuesday": { "Morning": 0, "Afternoon": 0 },
            "Wednesday": { "Morning": 0, "Afternoon": 0 },
            "Thursday": { "Morning": 0, "Afternoon": 0 },
            "Friday": { "Morning": 0, "Afternoon": 0 }
        };
        this.used_room2 = {
            "Monday": { "Morning": 0, "Afternoon": 0 },
            "Tuesday": { "Morning": 0, "Afternoon": 0 },
            "Wednesday": { "Morning": 0, "Afternoon": 0 },
            "Thursday": { "Morning": 0, "Afternoon": 0 },
            "Friday": { "Morning": 0, "Afternoon": 0 }
        };

        this.used_room3 = {
            "Monday": { "Morning": 0, "Afternoon": 0 },
            "Tuesday": { "Morning": 0, "Afternoon": 0 },
            "Wednesday": { "Morning": 0, "Afternoon": 0 },
            "Thursday": { "Morning": 0, "Afternoon": 0 },
            "Friday": { "Morning": 0, "Afternoon": 0 }
        };

        this.used_room4 = {
            "Monday": { "Morning": 0, "Afternoon": 0 },
            "Tuesday": { "Morning": 0, "Afternoon": 0 },
            "Wednesday": { "Morning": 0, "Afternoon": 0 },
            "Thursday": { "Morning": 0, "Afternoon": 0 },
            "Friday": { "Morning": 0, "Afternoon": 0 }
        };
    }

    hasRoom1(day, time) {
        if (this.used_room1[day][time] < 1) { //still not filled
            return true;
        }
        return false;
    }

    hasRoom2(day, time) {
        if (this.used_room1[day][time] < 1) {
            return true;
        }
        return false;
    }

    hasRoom3(day, time) {
        if (this.used_room1[day][time] < 1) {
            return true;
        }
        return false;
    }

    hasRoom4(day, time) {
        if (this.used_room4[day][time] < 1) {
            return true;
        }
        return false;
    }

    addToSchedule(code, roomSize, day, time) { //roomSize yerine capacity
        let room;
        if (roomSize > 100) {
            this.used_room4[day][time] += 1;
            room = (roomSize + this.used_room4[day][time]);
        } else if (roomSize > 60) {
            this.used_room3[day][time] += 1;
            room = (roomSize + this.used_room3[day][time])
        } else if (roomSize > 52) {
            this.used_room2[day][time] += 1;
            room = (roomSize + this.used_room2[day][time])
        } else {
            this.used_room1[day][time] += 1;
            room = (roomSize + this.used_room1[day][time])
            this.schedule_table[day][time].push(new ScheduleFormat(code, room, day, time)) //?
        }
    }
    display() {
        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

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
document.addEventListener('DOMContentLoaded', function () { // DOMContentLoaded olayını dinleyin
    document.getElementById('courses').addEventListener('change', async function (event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = async function (e) {
            const csvData = e.target.result;
            console.log(csvData)
            const csv_rows = csvData.split('\r\n');
            console.log(csv_rows)
            console.log(csv_rows.length)

            for (let i = 0; i < csv_rows.length - 1; i++) {
                console.log("fora gridi:")
                console.log(i)
                const row = csv_rows[i].split(';');
                if (find(instructor_list, row[7]) === false) {  // no duplicate instructor
                    // let inst = ;
                    console.log(new Instructor(row[7]));
                    instructor_list.push(new Instructor(row[7]));
                } else {
                    inst = find_obj(instructor_list, row[7]);
                }
                if (row[5] === "D") {  // department course
                    department_courses.push(new Course(row[0], row[1], row[2], row[3], row[4], row[5], row[6], new Instructor(row[7])));
                } else {  // service course
                    service_courses.push(new Course(row[0], row[1], row[2], row[3], row[4], row[5], row[6], new Instructor(row[7])));
                }
            }
            all_courses = department_courses + service_courses;
            console.log("Csv dataam:")
            console.log(csvData)
            department_courses.forEach(element => {
                console.log(element);
            });
            service_courses.forEach(element => {
                console.log(element);
            });
        };

        reader.readAsText(file);
        alert("excele girdi")
        console.log(file)
        console.log(department_courses)

    });
});

// take busy time
// Dosya seçme elementine bir olay dinleyici ekleyin ve bir dosya seçildiğinde veri işleme işlemini yapın
document.addEventListener('DOMContentLoaded', function () {
document.getElementById('busy').addEventListener('change', async function () {
    console.log("Heyyy");
    // Seçilen dosyayı alın
    const file = this.files[0];
    // Dosya içeriğini metin olarak okuyun
    const text = await file.text();
    // Metni CSV satırlarına ayırın
    const csv_rows = text.split('\n');
    // CSV satırlarını işleyin
    console.log("\n"+csv_rows.length+ "busy row");
    for (let i = 0; i < csv_rows.length; i++) {
        console.log("Lopta\n");
      const row = csv_rows[i].split(';');
      console.log(row[0]);
      console.log(find(instructor_list, row[0]));
      if (find(instructor_list, row[0])) {  // Eğer böyle bir eğitmen varsa
        console.log("Hoca buldu\n");
          find_obj(instructor_list, row[0]).setBusyTime(row[1], row[2]);
      }
    }
    // İşlenen verileri konsola yazdırın
    // console.log(instructor_list[0].toString + "Hoca");
    instructor_list.forEach(element => {
        console.log(element);
      });
  });
});

let room1;  //holds room name accordinng to capacity
let room2;
let room3;
let room4;
document.addEventListener('DOMContentLoaded', function() {
    // classroom dosyası yüklendiğinde yapılacak işlemler
    document.getElementById('classroom').addEventListener('change', async function(event) {
        const file = event.target.files[0];
        const text = await file.text();
        const csv_rows = text.split('\r\n');
        console.log(csv_rows);
      
        let room1, room2, room3, room4;
      
        for (let i = 0; i < csv_rows.length -1; i++) {
            const row = csv_rows[i].split(';');
            if (parseInt(row[1]) > 100) {
                room4 = row[0];
            } else if (parseInt(row[1]) > 60) {
                room3 = row[0];
            } else if (parseInt(row[1]) > 52) {
                room2 = row[0];
            } else {
                room1 = row[0];
            }
        }
      
        console.log(room1 + " room1, " + room2 + " room2, " + room3 + " room3, " + room4+ " room4" );
    });
})

let schedule = new Schedule(room1, room2, room3, room4); // new instance of a schedule


document.addEventListener('DOMContentLoaded', function () {
    // service dosyası yüklendiğinde yapılacak işlemler
    document.getElementById('service').addEventListener('change', async function(event)
    {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = async function (e) {
            const csvData = e.target.result;
        //    console.log(csvData)
            const csv_rows = csvData.split('\r\n');
            // console.log(csv_rows)
            // console.log(csv_rows.length)

            for (let i = 0; i < csv_rows.length - 1; i++) {
                const row = csv_rows[i].split(';');
                console.log(row);

        let s_course = find_obj(service_courses, row[0]); // finding service course by its id
        if (schedule.hasRoom4(row[1], row[2]) && (s_course._compulsary_elective == "C" || !schedule.hasRoom3(row[1], row[2]) || !schedule.hasRoom2(row[1], row[2]) || !schedule.hasRoom1(row[1], row[2]))) { // compulsory or there is no room for elective
            schedule.addToSchedule(row[0], s_course._capacity, row[1], row[2]); // code, room, day, time
            s_course.setRoom(); // set hasRoom == true
        } else if (schedule.hasRoom3(row[1], row[2])) {
            schedule.addToSchedule(row[0], s_course.capacity, row[1], row[2]); // code, room, day, time
            s_course.setRoom(); // set hasRoom == true
        } else if (schedule.hasRoom2(row[1], row[2])) {
            schedule.addToSchedule(row[0], s_course.capacity, row[1], row[2]); // code, room, day, time
            s_course.setRoom(); // set hasRoom == true
        } else if (schedule.hasRoom1(row[1], row[2])) {
            schedule.addToSchedule(row[0], s_course.capacity, row[1], row[2]); // code, room, day, time
            s_course.setRoom(); // set hasRoom == true
        }
    }

    

    }

    reader.readAsText(file);    
    function hasSameYear(schedule, year) {
        for (let s of schedule) {
            let course = find_obj(all_courses, s._code);
            if (course._year == year) { //?
                console.log('LOPtayımmm');
                return true;
            }
        }
        return false;
    }
    async function makeSchedule (schedule, d_list){
        alert("makeSchedule")
        // department courses will be added to schedule according to the defined constraints 
        for (let d_c of d_list) {
            for (let day of days) {
                for (let time of times) {
                    if (d_c._hasRoom || d_c._instructor.isBusy(day, time)) { // if the course has already been assigned a room or instructor is busy at that time
                        break;
                    } else if (!hasSameYear(schedule.schedule_table[day][time], d_c._year)) { // if the course already present in that time slot is not the same as the one we are about to insert
                        if (schedule.hasRoom4(day, time) && (d_c._compulsary_elective == "C" || !schedule.hasRoom3(day, time) || !schedule.hasRoom2(day, time) || !schedule.hasRoom1(day, time))) {
                            schedule.addToSchedule(d_c._code, d_c._capacity, day, time); // code, room, day, time
                            d_c.setRoom(); // set hasRoom == true
                        } else if (d_c._compulsary_elective == "E" && schedule.hasRoom3(day, time)) {
                            schedule.addToSchedule(d_c._code, d_c._capacity, day, time); // code, room, day, time
                            d_c.setRoom(); // set hasRoom == true
                        } else if (d_c._compulsary_elective == "E" && schedule.hasRoom2(day, time)) {
                            schedule.addToSchedule(d_c._code, d_c._capacity, day, time); // code, room, day, time
                            d_c.setRoom(); // set hasRoom == true
                        } else if (d_c._compulsary_elective == "E" && schedule.hasRoom1(day, time)) {
                            schedule.addToSchedule(d_c._code, d_c._capacity, day, time); // code, room, day, time
                            d_c.setRoom(); // set hasRoom == true
                        }
                    }
                }
            }
        }
    }
    //alert("excele girdi")
    //console.log(file)
    //console.log(department_courses)
    let stack_left = [];
    let stack_replaced = [];
    console.log("BAKKKKK")
    console.log(department_courses)
    makeSchedule( schedule, department_courses);
    var flag = anyCourseLeft(department_courses, stack_left); // if there is left over courses flag is false, left courses will be printed -> schedule is not completed

    if (!flag) { // there are courses that don't have any room
        placeLeftCourses(schedule.schedule_table, stack_left, stack_replaced); // place these courses to available place
        makeSchedule(schedule, stack_replaced); // place replaced courses to schedule
        flag = anyCourseLeft(department_courses, stack_left); // if flag is true, there is a schedule
        if (flag) {
            console.log("\nThere is a schedule: \n");
            schedule.display();
        }
        else { // if flag is false, no schedule is produced for courses
            console.log("There is no way to make a schedule for the department.");
        }
    }
    else { // if flag is true, there is a schedule
        console.log("\n*There is a schedule: \n");
        schedule.display();
    }

    })
})
        function anyCourseLeft(d_list, stack_left) {
            let flag = true;
            for (let d of d_list) {
                if (!d._hasRoom) {
                    stack_left.push(d);
                    flag = false;
                }
            }
            return flag;
        }

        function placeLeftCourses(schedule, stack_left, stack_replaced) {
            let flag2 = true;
            for (let c of stack_left) {
                flag2 = true;
                for (let day of days) {
                    for (let time of times) {
                        for (let i = 0; i < schedule[day][time].length; i++) {
                            if (!hasSameYear(schedule[day][time], c._year) && !find(service_courses, schedule[day][time][i]._code)) {
                                let course = find_obj(department_courses, schedule[day][time][i]._code);
                                course.setEmpty();
                                schedule[day][time][i].replace(c._code);
                                c.setRoom();
                                stack_replaced.push(course);
                                flag2 = false;
                            }
                            if (!flag2) {
                                break;
                            }
                        }
                        if (!flag2) {
                            break;
                        }
                    }
                    if (!flag2) {
                        break;
                    }
                }
            }
        }




// let schedule = new Schedule(room1, room2, room3, room4); // new instance of a schedule



// // fs.createReadStream('C:\Users\eseym\Desktop\service.csv')
// // .pipe(csv.parse({ delimiter: ';' }))
// // .on('data', function(row) {
//     document.addEventListener('DOMContentLoaded', function() {
//         // classroom dosyası yüklendiğinde yapılacak işlemler
//         document.getElementById('service').addEventListener('change', async function(event) {
// let s_course = find_obj(service_courses, row[0]); // finding service course by its id
// if (schedule.hasRoom4(row[1], row[2]) && (s_course._compulsary_elective == "C" || !schedule.hasRoom3(row[1], row[2]) || !schedule.hasRoom2(row[1], row[2]) || !schedule.hasRoom1(row[1], row[2]))) { // compulsory or there is no room for elective
// schedule.addToSchedule(row[0], s_course._capacity, row[1], row[2]); // code, room, day, time
// s_course.setRoom(); // set hasRoom == true
// } else if (schedule.hasRoom3(row[1], row[2])) {
//     schedule.addToSchedule(row[0], s_course.capacity, row[1], row[2]); // code, room, day, time
//     s_course.setRoom(); // set hasRoom == true
// }else if (schedule.hasRoom2(row[1], row[2])){
//     schedule.addToSchedule(row[0], s_course.capacity, row[1], row[2]); // code, room, day, time
//     s_course.setRoom(); // set hasRoom == true
// }else if (schedule.hasRoom1(row[1], row[2])){
//     schedule.addToSchedule(row[0], s_course.capacity, row[1], row[2]); // code, room, day, time
//     s_course.setRoom(); // set hasRoom == true
// }
// // })
// });
// })
// .on('end', function() {
// let all_courses = department_courses.concat(service_courses); // all courses
// function hasSameYear(schedule, year) {
//     for (let s of schedule) {
//         let course = find_obj(all_courses, s._code);
//         if (course._year == year) {
//             return true;
//         }
//     }
//     return false;
// }
// function makeSchedule(schedule, d_list) {
//     // department courses will be added to schedule according to the defined constraints 
//     for (let d_c of d_list) {
//         for (let day of days) {
//             for (let time of times) {
//                 if (d_c._hasRoom || d_c._instructor.isBusy(day, time)) { // if the course has already been assigned a room or instructor is busy at that time
//                     break;
//                 } else if (!hasSameYear(schedule.schedule_table[day][time], d_c._year)) { // if the course already present in that time slot is not the same as the one we are about to insert
//                     if (schedule.hasRoom4(day, time) && (d_c._compulsary_elective == "C" || !schedule.hasRoom3(day, time) || !schedule.hasRoom2(day, time) || !schedule.hasRoom1(day, time))) {
//                         schedule.addToSchedule(d_c._code, d_c._capacity, day, time); // code, room, day, time
//                         d_c.setRoom(); // set hasRoom == true
//                     } else if (d_c._compulsary_elective == "E" && schedule.room3(day, time)) {
//                         schedule.addToSchedule(d_c._code, d_c._capacity, day, time); // code, room, day, time
//                         d_c.setRoom(); // set hasRoom == true
//                     }else if (d_c._compulsary_elective == "E" && schedule.room2(day, time)) {
//                         schedule.addToSchedule(d_c._code, d_c._capacity, day, time); // code, room, day, time
//                         d_c.setRoom(); // set hasRoom == true
//                     }else if (d_c._compulsary_elective == "E" && schedule.room1(day, time)) {
//                         schedule.addToSchedule(d_c._code, d_c._capacity, day, time); // code, room, day, time
//                         d_c.setRoom(); // set hasRoom == true
//                     }
//                 }
//             }
//         }
//     }
// }


// function anyCourseLeft(d_list, stack_left) {
//     let flag = true;
//     for (let d of d_list) {
//         if (!d._hasRoom) {
//             stack_left.push(d);
//             flag = false;
//         }
//     }
//     return flag;
// }

// function placeLeftCourses(schedule, stack_left, stack_replaced) {
//     let flag2 = true;
//     for (let c of stack_left) {
//         flag2 = true;
//         for (let day of days) {
//             for (let time of times) {
//                 for (let i = 0; i < schedule[day][time].length; i++) {
//                     if (!hasSameYear(schedule[day][time], c._year) && !find(service_courses, schedule[day][time][i]._code)) {
//                         let course = find_obj(department_courses, schedule[day][time][i]._code);
//                         course.setEmpty();
//                         schedule[day][time][i].replace(c._code);
//                         c.setRoom();
//                         stack_replaced.push(course);
//                         flag2 = false;
//                     }
//                     if (!flag2) {
//                         break;
//                     }
//                 }
//                 if (!flag2) {
//                     break;
//                 }
//             }
//             if (!flag2) {
//                 break;
//             }
//         }
//     }
// }

let stack_left = [];
let stack_replaced = [];

makeSchedule(schedule, department_courses);
var flag = anyCourseLeft(department_courses, stack_left); // if there is left over courses flag is false, left courses will be printed -> schedule is not completed

if (!flag) { // there are courses that don't have any room
placeLeftCourses(schedule.schedule_table, stack_left, stack_replaced); // place these courses to available place
makeSchedule(schedule, stack_replaced); // place replaced courses to schedule
flag = anyCourseLeft(department_courses, stack_left); // if flag is true, there is a schedule
if (flag) {
console.log("\nThere is a schedule: \n");
schedule.display();
}
else { // if flag is false, no schedule is produced for courses
console.log("There is no way to make a schedule for the department.");
}
}
else { // if flag is true, there is a schedule
console.log("\n*There is a schedule: \n");
schedule.display();
}