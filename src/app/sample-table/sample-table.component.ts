import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-sample-table',
  templateUrl: './sample-table.component.html',
  styleUrls: ['./sample-table.component.css'],
})
export class SampleTableComponent implements OnInit, OnDestroy {
  constructor(private changeDetectorRef: ChangeDetectorRef) {}
  dynamicArray = [];
  colSum = [];
  sum: number;
  totalSum: number;

  ngOnInit(): void {
    this.changeDetectorRef.detectChanges();
    if (sessionStorage.length > 0) {
      this.dynamicArray = JSON.parse(
        window.sessionStorage.getItem('sessionData')
      );
      this.colSum = JSON.parse(window.sessionStorage.getItem('columnsSum'));
    } else {
      let newData = [
        { data: '', showData: true },
        { data: '', showData: true },
        { sum: 0, showData: false },
      ];
      this.dynamicArray.push(newData);
      this.colSum = [0, 0, 0];
    }

    // this.setAndUpdateSession();
  }

  ngOnDestroy(): void {
    window.sessionStorage.clear();
  }

  setAndUpdateSession() {
    window.sessionStorage.setItem(
      'sessionData',
      JSON.stringify(this.dynamicArray)
    );
  }

  valuechange(e) {
    console.log('event', e);
    this.calculateSumOfRows();
    this.calculateSumOfCols();
  }

  addRow() {
    let newRow = [];
    for (let i = 0; i < this.dynamicArray[0].length - 1; i++) {
      newRow.push({ data: '', showData: true });
    }
    this.dynamicArray.push(newRow);
    this.appendSum();
    this.setAndUpdateSession();
  }

  addColumn() {
    this.dynamicArray.forEach((d) => {
      d.push({ data: '', showData: true });
    });
    this.appendSum();
    this.setAndUpdateSession();
  }

  appendSum() {
    this.dynamicArray.forEach((d) => {
      let index = d.findIndex((e) => !e.showData);
      if (index == -1) {
        d.push({ sum: 0, showData: false });
      } else {
        d.push(d.splice(index, 1)[0]);
      }
    });
  }

  calculateSumOfRows() {
    let sumofRow = 0;
    for (let i = 0; i < this.dynamicArray.length; i++) {
      sumofRow = 0;
      for (let j = 0; j < this.dynamicArray[i].length - 1; j++) {
        sumofRow += this.dynamicArray[i][j].data;
      }
      this.dynamicArray[i][this.dynamicArray[i].length - 1].sum = sumofRow;
      this.setAndUpdateSession();
    }
  }

  calculateSumOfCols() {
    this.colSum = [];
    for (let i = 0; i < this.dynamicArray[0].length - 1; i++) {
      this.sum = 0;
      this.dynamicArray.forEach((item) => {
        this.sum += item[i].data;
      });
      this.colSum.push(Number(this.sum));
    }
    this.colSum.push(Number(this.colSum.reduce((a, b) => a + b, 0)));
    window.sessionStorage.setItem('columnsSum', JSON.stringify(this.colSum));
    this.setAndUpdateSession();
  }
}
