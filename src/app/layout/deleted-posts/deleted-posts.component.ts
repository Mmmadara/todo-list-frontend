import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Post } from 'src/app/models/Post';
import { NotificationService } from 'src/app/service/notification.service';
import { PostService } from 'src/app/service/post.service';
import { PostDialogComponent } from '../post-dialog/post-dialog.component';

@Component({
  selector: 'app-deleted-posts',
  templateUrl: './deleted-posts.component.html',
  styleUrls: ['./deleted-posts.component.scss'],
})
export class DeletedPostsComponent implements OnInit {
  posts!: Post[];
  user: any;

  constructor(
    private postService: PostService,
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllNotActivePosts();
  }

  getAllNotActivePosts() {
    this.postService.getAllNotActivePosts().subscribe((data) => {
      // console.log(data);

      this.posts = data;
    });
  }

  activatePost(postId: any) {
    this.postService.activatePost(postId).subscribe((data) => {
      // console.log(data);

      this.notificationService.showSnackBar('Post successfully restored');
      this.getAllNotActivePosts();
    });
  }

  deletePost(postId: any) {
    this.postService.delete(postId).subscribe(() => {
      this.notificationService.showSnackBar('Post deleted permanently');
      this.getAllNotActivePosts();
    });
  }

  openPost(postId: any) {
    this.dialog.open(PostDialogComponent, {
      width: '700px',
      height: '400px',
      data: {
        postId: postId,
      },
    });

    this.dialog.afterAllClosed.subscribe((result) => {
      console.log(result);
    });
  }
}
