angular.module('postsApp')
  .controller('postsController', function() {
    this.user = {
      name: 'Natasha Milostrone',
      id: 3,
      photo: './assets/img/natasha_milostrone.jpg',
    };

    this.allPosts = wallPosts.map(function(item) {
      return Object.assign({}, item, { isEditMode: false });
    });

    this.displayPosts = this.allPosts;

    this.isNewPostsFormVisible = false;

    this.openEditForm = function(index) {
      let itemToEdit = this.displayPosts[index];
      itemToEdit.editedTitle = itemToEdit.title;
      itemToEdit.editedMessage = itemToEdit.message;
      itemToEdit.isEditMode = true;
    }

    this.saveEditedPost = function(index) {
      let itemToEdit = this.displayPosts[index];
      itemToEdit.title = itemToEdit.editedTitle;
      itemToEdit.message = itemToEdit.editedMessage;
      itemToEdit.isEditMode = false;
    }

    this.savePost = function() {
      this.allPosts.push({ 
        title: this.newPostTitle,
        message: this.newPostMessage, 
        author_id: this.user.id, 
        author_name: this.user.name, 
        author_photo: this.user.photo, 
        liked_by: [] 
      });

      this.displayPosts = this.allPosts;

      this.newPostTitle = '';
      this.newPostMessage = '';
    }

    this.onSearchChanged = function(searchText) {
      this.displayPosts = this.allPosts.filter((p) => p.title.toLowerCase().includes(searchText.toLowerCase()));
    }

    this.like = function (id) {
      let postToLike = this.displayPosts[id];

      if (!postToLike.liked_by.some((p) => p.id == this.user.id)) {
        postToLike.liked_by.push(this.user);      
      } else {
        for (let i = 0; i < postToLike.liked_by.length; i++) {
          if (postToLike.liked_by[i].id === this.user.id) {
            postToLike.liked_by.splice(i, 1);
          }
        }
      }
    }

    this.isLikedByMe = function(id) {
      let post = this.displayPosts[id];

      for (let i = 0; i < post.liked_by.length; i++) {
        if (post.liked_by[i].id === this.user.id) {
          return true;
        }
      }

      return false;
    }

    this.isMyPost = function(id) {
      let post = this.displayPosts[id];

      return post.author_id === this.user.id;
    }
  });
  