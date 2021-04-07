import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import { ApiService } from '../service/api.service';
declare var $: any;
@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {
  selectedCustomer: any;
  selectedCaseColor: any;
  orderDate: any;
  selectedOrderStatus: any;
  address: any;
  selectedFiles: FileList;
  currentFile: File;
  constructor(public datepipe: DatePipe, private spinner: NgxSpinnerService,
    public service: ApiService) {
    let vm = this;
    vm.selectedCustomer = '0';
    vm.selectedCaseColor = '0';
    vm.selectedOrderStatus = '0';
    let todayDate = new Date();
    vm.orderDate = vm.datepipe.transform(todayDate, 'yyyy-MM-dd');
  }
  ngOnInit(): void {
  }
  selectFile(event): void {
    let vm = this;
    vm.selectedFiles = event.target.files;
    vm.currentFile = vm.selectedFiles.item(0);
  }
  placeOrder() {
    let vm = this;
    vm.spinner.show();
    let postData = {
      "CustomerId": parseInt(vm.selectedCustomer ? vm.selectedCustomer : '0'),
      "CaseColor": vm.selectedCaseColor == 1 ? 'Blue' : vm.selectedCaseColor == 2 ? 'Red' : vm.selectedCaseColor == 3 ? 'Green' : 'White',
      "Address": vm.address ? vm.address : '',
      "OrderDate": vm.orderDate ? vm.orderDate : '1990-01-01',
      "OrderStatus": parseInt(vm.selectedOrderStatus ? vm.selectedOrderStatus : '0'),
      "Attachments": vm.currentFile ? [vm.currentFile] : []
    }
    console.log(postData);
    vm.service.placeOrder(postData, vm.currentFile).subscribe((data: any) => {
      console.log(data);
      vm.spinner.hide();
    });
  }
}
