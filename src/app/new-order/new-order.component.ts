import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
declare var bootbox: any;
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
  constructor(public datepipe: DatePipe,
    private spinner: NgxSpinnerService,
    public service: ApiService,
    public route: Router,
    public toastr: ToastrService) {
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
  isEmpty(val) {
    return (val === 0 || val === '0' || val === false || val === '' || val === undefined || val == null || val.length <= 0) ? true : false;
  }
  presentAlert(msg) {
    bootbox.alert({
      message: msg,
      backdrop: true
    });
  }
  placeOrder() {
    let vm = this;
    if (vm.isEmpty(vm.selectedCustomer)) {
      vm.presentAlert('Please select a customer!')
    } else if (vm.isEmpty(vm.selectedCaseColor)) {
      vm.presentAlert('Please select a case color!');
    } else if (vm.isEmpty(vm.selectedOrderStatus)) {
      vm.presentAlert('Please select a order status!');
    } else if (vm.isEmpty(vm.address)) {
      vm.presentAlert('Please enter your address!');
    } else if (vm.isEmpty(vm.currentFile)) {
      vm.presentAlert('Please choose a file');
    } else {
      vm.spinner.show();
      let postData = {
        "CustomerId": parseInt(vm.selectedCustomer ? vm.selectedCustomer : '0'),
        "CaseColor": vm.selectedCaseColor == 1 ? 'Blue' : vm.selectedCaseColor == 2 ? 'Red' : vm.selectedCaseColor == 3 ? 'Green' : 'White',
        "Address": vm.address ? vm.address : '',
        "OrderDate": vm.orderDate ? vm.orderDate : '1990-01-01',
        "OrderStatus": parseInt(vm.selectedOrderStatus ? vm.selectedOrderStatus : '0')
      }
      // console.log(postData);
      vm.service.placeOrder(postData, vm.currentFile).subscribe((data: any) => {
        vm.spinner.hide();
        if (data.status == 200) {
          vm.toastr.info('Order placed successfully', 'Congratulations');
          vm.route.navigateByUrl('/orders');
        }
        else {
          alert(data.message)
        }
      });
    }
  }
}
