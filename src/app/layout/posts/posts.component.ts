import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/Post';
import { NotificationService } from 'src/app/service/notification.service';
import { PostService } from 'src/app/service/post.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PostDialogComponent } from '../post-dialog/post-dialog.component';
import { User } from 'src/app/models/User';
import { ItemService } from 'src/app/service/item.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  posts: Post[] | undefined;
  user: any | User;
  value = 'New Post';

  constructor(
    private postService: PostService,
    private itemService: ItemService,
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllActivePosts();
  }

  getAllActivePosts() {
    this.postService.getAllActivePosts().subscribe((data) => {
      this.posts = data;
    });
  }

  newPost() {}

  createPost(name: string) {
    this.postService.createPost(name).subscribe(() => {
      this.notificationService.showSnackBar('Post created successfully!');
      this.getAllActivePosts();
    });
  }

  deactivatePost(postId: any) {
    this.postService.deactivatePost(postId).subscribe(() => {
      this.notificationService.showSnackBar('Post successfully deleted');
      this.getAllActivePosts();
    });
  }

  openPost(post: Post) {
    const newDialog = this.dialog.open(PostDialogComponent, {
      width: '1000px',
      height: '700px',
      disableClose: true,
      data: {
        id: post.id,
        name: post.name,
      },
    });

    newDialog.afterClosed().subscribe((result) => {
      return this.itemService.editPost(post.id!, result).subscribe();
    });
  }
}
