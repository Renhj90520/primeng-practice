import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem, DataTable,LazyLoadEvent } from 'primeng/primeng';
import Dexie from 'dexie';
import { Observable } from 'rxjs';
const MAX_EXAMPLE_RECORDS = 1000;

@Component({
  selector: 'app-alltimes',
  templateUrl: './alltimes.component.html',
  styleUrls: ['./alltimes.component.css']
})
export class AlltimesComponent implements OnInit {
  allTimesheetData = [
    { user: 'Glen', project: 'Payroll App', category: 'Backend', startTime: 1000, endTime: 1700, date: 1434243 },
    { user: 'Karen', project: 'Agile Times', category: 'Frontend', startTime: 900, endTime: 1700, date: 1434243 },
    { user: 'Si', project: 'Mobile App', category: 'Operations', startTime: 1100, endTime: 1700, date: 1434243 },
    { user: 'Rohit', project: 'Agile Times', category: 'Backend', startTime: 800, endTime: 1700, date: 1434243 },
  ];
  allProjectNames = ['', 'Payroll App', 'Mobile App', 'Agile Times'];

  allProjects = this.allProjectNames.map((proj) => {
    return { label: proj, value: proj };
  });

  selectedRow: any;

  contextMenu: MenuItem[];
  recordCount: number;

  db: Dexie;
  @ViewChild('dt') dt: DataTable;
  constructor() {
    for (let index = 0; index < 5; index++) {
      this.allTimesheetData = this.allTimesheetData.concat(this.allTimesheetData);
    }
    this.recordCount = this.allTimesheetData.length;
    this.configDatabase();
    this.populateDatabase();
  }
  configDatabase() {
    this.db = new Dexie('AgileTimes');
    this.db.version(1).stores({
      timesheet: 'id,user,project,category,startTime,endTime,date'
    });
  }
  populateDatabase() {
    this.getRecordCount()
      .then(count => {
        this.recordCount = count;
        if (!count) {
          this.resetDatabase();
        }
      });
  }

  getRecordCount(): Dexie.Promise<number> {
    return this.db.table('timesheet').count();
  }
  resetDatabase() {
    const that = this;
    this.dt.loading = true;
    this.db.table('timesheet').clear().then(() => {
      console.log('Database cleared');
      Observable.range(0, MAX_EXAMPLE_RECORDS).do(
        function (id) {
          const randomUser = that.generateRandomUser(id);
          that.db.table('timesheet').add(randomUser);
          if (id % 100 === 0) {
            that.getRecordCount().then((count) => {
              that.recordCount = count;
            });
          }

        },
        function (err) {
          console.log('Do Error: %s', err);
        },
        function () {
          console.log('Do complete');
          that.dt.loading = false;
          that.dt.reset();
        }).subscribe(() => {
          console.log('Finished Reset database');
          that.getRecordCount().then((count) => {
            that.recordCount = count;
          });
        });
    });
  }
  generateRandomUser(id: number) {

    const names = ['Joe', 'Mary', 'Phil', 'Karen', 'Si', 'Tim', 'Rohit', 'Jenny', 'Kim', 'Greg', 'Danni']
    const allProjectNames = ['Payroll App', 'Mobile App', 'Agile Times'];
    const allCategories = ['Frontend', 'Backend', 'Operations'];

    const newUser = {
      id: id,
      user: names[id % names.length],
      project: allProjectNames[id % allProjectNames.length],
      category: allCategories[id % allCategories.length],
      startTime: Math.round(Math.random() * 1000),
      endTime: Math.round(Math.random() * 1000),
      date: Math.round(Math.random() * 100000)
    };
    newUser.endTime += newUser.startTime; // to make sure it's later

    return newUser;

  }

  ngOnInit() {
    this.contextMenu = [
      { label: 'Debug', icon: 'fa-bug', command: (event) => this.onDebug(this.selectedRow) },
      { label: 'Delete', icon: 'fa-close', command: (event) => this.onDelete(this.selectedRow) }
    ];
  }
  onDebug(selected) {

  }
  onDelete(selected) {

  }
  onEditComplete(editInfo) {
    const fieldChanged = editInfo.column.field;
    const newRowValues = editInfo.data;
    alert(`You edited ${fieldChanged} to ${newRowValues[fieldChanged]}`);
  }
  onRowSelect(rowInfo) {
    // alert(JSON.stringify(rowInfo));
  }

  loadTimes(event: LazyLoadEvent) {
    
        console.log(JSON.stringify(event));
    
        let table = this.db.table("timesheet");
    
        var query: any;
    
        // Dexie doesn't support ordering AND filtering, so we branch here
        // Alternative strategies here: https://github.com/dfahlander/Dexie.js/issues/297
        if (event.filters && event.filters["project"]) {
          query = table.where("project").equals(event.filters["project"]["value"]);
        } else if (event.globalFilter) {
          query = table.where("project").startsWithIgnoreCase(event.globalFilter)
            .or("user").startsWithIgnoreCase(event.globalFilter)
            .or("category").startsWithIgnoreCase(event.globalFilter);
        } else {
          query = table.orderBy(event.sortField);
        }
    
        query = query
          .offset(event.first)
          .limit(event.rows);
    
        if (event.sortOrder == -1) {
          query = query.reverse();
        };
    
        query.toArray((nextBlockOfTimes) => {
          // console.log("Loaded times: %s", JSON.stringify(nextBlockOfTimes));
          this.allTimesheetData = nextBlockOfTimes;
        });
      }
}
