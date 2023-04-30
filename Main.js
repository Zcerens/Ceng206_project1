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
            // console.log(b._day + " b._day," + day + " day, "+ b._time + " b._time," + time + " time, ");
            if (b._day === day && b._time === time) {
                // console.log("Truee");
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
        if (this.used_room1[day][time] === 0) { //still not filled
            return true;
        }
        return false;
    }

    hasRoom2(day, time) {
        if (this.used_room1[day][time] === 0) {
            return true;
        }
        return false;
    }

    hasRoom3(day, time) {
        if (this.used_room1[day][time] === 0) {
            return true;
        }
        return false;
    }

    hasRoom4(day, time) {
        if (this.used_room4[day][time] === 0) {
            return true;
        }
        return false;
    }

    addToSchedule(code, roomSize, day, time) { //roomSize yerine capacity
        let room;
        if (roomSize > 100) {
            this.used_room4[day][time] += 1;
            room = room4;
        } else if (roomSize > 60) {
            this.used_room3[day][time] += 1;
            room = room3;
        } else if (roomSize > 52) {
            this.used_room2[day][time] += 1;
            room = room2;
        } else if (roomSize <= 52){
            this.used_room1[day][time] += 1;
            room = room1;           
        }
        this.schedule_table[day][time].push(new ScheduleFormat(code, room, day, time))
    }
    display() {
        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  let tableHtml = "<table>";
  tableHtml += "<tr><th>Day</th><th>Time</th><th>Room</th><th>Code</th></tr>";

  for (let day of days) {
    for (let s of this.schedule_table[day]["Morning"]) {
      tableHtml += `<tr><td>${day}</td><td>Morning</td><td>${s._room}</td><td>${s._code}</td></tr>`;
    }
    for (let s of this.schedule_table[day]["Afternoon"]) {
      tableHtml += `<tr><td>${day}</td><td>Afternoon</td><td>${s._room}</td><td>${s._code}</td></tr>`;
    }
  }

  tableHtml += "</table>";
  document.body.innerHTML = tableHtml;
}
}

class ScheduleFormat {
    constructor(code, room, day, time) {
        this._day = day; // day and time
        this._time = time;
        this._code = code; // course code
        this._room = room; //  
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
    const csv_rows = text.split('\r\n');
    // CSV satırlarını işleyin
    console.log("\n"+csv_rows.length+ "busy row");
    for (let i = 0; i < csv_rows.length; i++) {
        console.log("Lopta\n");
      const row = csv_rows[i].split(';');
      console.log(row[0]);
      console.log(find(instructor_list, row[0]));
      if (find(instructor_list, row[0])) {  // Eğer böyle bir eğitmen varsa
        console.log("Hoca buldu\n");
        console.log(row[1]+ " " + row[2]);
          find_obj(instructor_list, row[0]).setBusyTime(row[1], row[2]);
      }
    }

    // İşlenen verileri konsola yazdırın
    // console.log(instructor_list[0].toString + "Hoca");
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
            console.log(csvData);
            const csv_rows = csvData.split('\r\n');
            console.log(csv_rows + "row");
            console.log(csv_rows.length+ "row length");
            for (let i = 0; i < csv_rows.length - 1; i++) {
                const row = csv_rows[i].split(';');

                let s_course = find_obj(service_courses, row[0]); // finding service course by its id
                console.log(row[1]+ " " + row[2]);
                // instructor_list.forEach(element => {
                //     element._busy_time.forEach(e =>{
                //         console.log(e._day + " "+ e._time + " Busy ne alemde " + element + " " + element.isBusy('Monday', 'Morning'));
                //     });      
                //   });
                  console.log(room1 + " " + room2 +" " + room3+ " "+ room4);
                console.log(s_course+ "scourseeeee");
                console.log(s_course._instructor);
                console.log(instructor_list);
                console.log(find_obj(instructor_list, s_course._instructor._name));
                console.log(s_course+ "= s_course, hasroom = "+ s_course._hasRoom+"inst = "+ s_course._instructor+ "Bus = "+find_obj(instructor_list,s_course._instructor._name).isBusy(row[1], row[2]));
                if (s_course._hasRoom ||find_obj(instructor_list, s_course._instructor._name).isBusy(row[1], row[2])) { // if the course has already been assigned a room or instructor is busy at that time
                    console.log(s_course+ "= s_course, hasroom = "+ s_course._hasRoom+"inst = "+ s_course._instructor+ "Bus = "+find_obj(instructor_list, s_course._instructor._name).isBusy(row[1], row[2]));
                    continue;
                } else if (!hasSameYear(schedule.schedule_table[row[1]][row[2]], s_course._year)) { // if the course already present in that time slot is not the same as the one we are about to insert
                    console.log("elseife girdim");
                    if ((schedule.hasRoom4(row[1], row[2])) && (s_course._capacity > 100 || !(schedule.hasRoom3(row[1], row[2]) && schedule.hasRoom2(row[1], row[2]) && schedule.hasRoom1(row[1], row[2])))) {
                        schedule.addToSchedule(row[0], s_course._capacity, row[1], row[2]); // code, room, day, time
                        s_course.setRoom(); // set hasRoom == true
                        console.log(s_course._hasRoom+ "hasROOOMM çalışıyor mu");
                    } else if (schedule.hasRoom3(row[1], row[2]) && (s_course._capacity> 60 || !(schedule.hasRoom2(row[1], row[2]) && schedule.hasRoom1(row[1], row[2])))) {
                        schedule.addToSchedule(row[0], s_course.capacity, row[1], row[2]); // code, room, day, time
                        s_course.setRoom(); // set hasRoom == true
                        console.log(s_course._hasRoom+ "hasROOOMM çalışıyor mu");
                    } else if (schedule.hasRoom2(row[1], row[2]) && (s_course._capacity > 52 || !(schedule.hasRoom1(row[1], row[2])))) {
                        schedule.addToSchedule(row[0], s_course.capacity, row[1], row[2]); // code, room, day, time
                        s_course.setRoom(); // set hasRoom == true
                        console.log(s_course._hasRoom+ "hasROOOMM çalışıyor mu");
                    } else if (schedule.hasRoom1(row[1], row[2])&& s_course._capacity <= 52) {
                        schedule.addToSchedule(row[0], s_course.capacity, row[1], row[2]); // code, room, day, time
                        s_course.setRoom(); // set hasRoom == true
                        console.log(s_course._hasRoom+ "hasROOOMM çalışıyor mu");
                        
                    }
                    for( var j=0;j<service_courses.length;j++){
            
                        console.log(service_courses[j]);
                
                        }

                }
            }
    }

    let all_courses = department_courses.concat(service_courses);
    reader.readAsText(file);
    function hasSameYear(schedule, year) {
        for (let s of schedule) {
            let course = find_obj(all_courses, s._code);
            console.log(all_courses._year);
            if (course._year == year) { 
                return true;
            }
        }
        return false;
    }

    async function makeSchedule (schedule, d_list){
   
        // department courses will be added to schedule according to the defined constraints 
        for (let d_c of d_list) {
            for (let day of days) {
                for (let time of times) {
                    if (d_c._hasRoom ||find_obj(instructor_list, d_c._instructor._name).isBusy(day, time)) { // if the course has already been assigned a room or instructor is busy at that time
                        console.log(d_c+ "= dc, hasroom = "+ d_c._hasRoom+"inst = "+ d_c._instructor+ "Bus = "+find_obj(instructor_list, d_c._instructor._name).isBusy(day, time));
                        break;
                    } 
                    else if (!hasSameYear(schedule.schedule_table[day][time], d_c._year)) { // if the course already present in that time slot is not the same as the one we are about to insert
                        console.log("elseife girdim");
                        if ((schedule.hasRoom4(day, time)) && (d_c._capacity > 100 || !(schedule.hasRoom3(day, time) && schedule.hasRoom2(day, time) && schedule.hasRoom1(day, time)))) {
                            schedule.addToSchedule(d_c._code, d_c._capacity, day, time); // code, room, day, time
                            d_c.setRoom(); // set hasRoom == true
                            console.log(d_c._hasRoom+ "d_c has roomcheck");
                        } else if (schedule.hasRoom3(day, time) && (d_c._capacity > 60 || !(schedule.hasRoom2(day, time) && schedule.hasRoom1(day, time)))) {
                            schedule.addToSchedule(d_c._code, d_c._capacity, day, time); // code, room, day, time
                            d_c.setRoom(); // set hasRoom == true
                        } else if (schedule.hasRoom2(day, time) && (d_c._capacity > 52 || !(schedule.hasRoom1(day, time)))) {
                            schedule.addToSchedule(d_c._code, d_c._capacity, day, time); // code, room, day, time
                            d_c.setRoom(); // set hasRoom == true
                        } else if (schedule.hasRoom1(day, time)&& d_c._capacity <= 52) {
                            schedule.addToSchedule(d_c._code, d_c._capacity, day, time); // code, room, day, time
                            d_c.setRoom(); // set hasRoom == true
                        }
                    }
                    
                }
            }
        }
    }


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
                        if (!hasSameYear(schedule[day][time], c._year) && !(find(service_courses, schedule[day][time][i]._code))) {
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
            }
        }
    }
}

    //alert("excele girdi")
    //console.log(file)
    //console.log(department_courses)
   function ok(){
        let stack_left = [];
        let stack_replaced = [];
        console.log("BAKKKKK");
        console.log(department_courses);
        makeSchedule(schedule, department_courses);
        let flag = anyCourseLeft(department_courses, stack_left); // if there is left over courses flag is false, left courses will be printed -> schedule is not completed
    
        if (!flag) { // there are courses that don't have any room
            placeLeftCourses(schedule.schedule_table, stack_left, stack_replaced); // place these courses to available place
            makeSchedule(schedule, stack_replaced); // place replaced courses to schedule
            flag = anyCourseLeft(department_courses, stack_left); // if flag is true, there is a schedule
            if (flag) {
                console.log("\nThere is a schedule: \n");
                schedule.display();
                console.log("bu ife girdi")
            }
            else { // if flag is false, no schedule is produced for courses
                alert("There is no way to make a schedule for the department.");
            }
        }
        else { // if flag is true, there is a schedule
    
            for( var i=0;i<service_courses.length;i++){
                
            console.log(service_courses[i]);
    
            }
            console.log("\n*There is a schedule: \n");
            schedule.display();
        }
    }
  
let button = document.getElementById("click");

// Butona tıklandığında ok() fonksiyonunu çağıracak 
button.addEventListener("click", function() {
    ok();
});

    
    
})
})
