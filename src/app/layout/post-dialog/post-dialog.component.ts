import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditItemDialogComponent } from 'src/app/layout/edit-item-dialog/edit-item-dialog.component';
import { Item } from 'src/app/models/Item';
import { Post } from 'src/app/models/Post';
import { ItemService } from 'src/app/service/item.service';

@Component({
  selector: 'app-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.scss'],
})
export class PostDialogComponent implements OnInit {
  items!: Item[];
  post: any;
  anyItem!: boolean;

  constructor(
    private itemService: ItemService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) {
    this.post = dialogData;
  }

  ngOnInit(): void {
    this.anyItem = true;
    this.itemService.getPostItems(this.post.id).subscribe((data) => {
      this.items = data;
      if (!this.items) {
        this.items = [];
        this.anyItem = false;
      }
    });
  }

  deleteItem(i: number) {
    this.items.splice(i, 1);
    console.log(this.items);
    
  }

  addItem() {
    let newItem: Item = {
      descr: 'Write something',
      done: false,
    };
    this.items.push(newItem);
    this.anyItem = true;
  }

  openEditor(item: Item, i: number) {
    const newDialog = this.dialog.open(EditItemDialogComponent, {
      data: item,
    });

    newDialog.afterClosed().subscribe((result) => {
      this.items[i].descr = result;
    });
  }
}
