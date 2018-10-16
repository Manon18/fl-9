$('.dark-wrapper').css('display', 'none');

fetch('data/media.json')
  .then(function(response) {
    return response.json();
    
  })
  .then(function(data){
    initialize(data);
  })
  .catch(function(err) {
    console.log(err);
  });

function initialize(data) {

   let images = data.media.map((item) => { 
    return { src: item['display_url'], description: item['edge_media_to_caption'], likes: item['edge_liked_by'].count }
  });

  const imagesInPage = 12;
  const imagesToLoad = 6;

  const imagesInRow = 3;
  let currentImageIndex;

  let showMoreBtn = $('.show-more-btn');

  showMoreBtn.click(() => {
    let renderedItemsCount = $('.image-section').length;

    addImagesToPage(images.slice(renderedItemsCount, renderedItemsCount + imagesToLoad));
  });

  addImagesToPage(images.slice(0, imagesInPage));

  function onImageClick(image) {
    $('.modal-window .img-active').attr('src', image.src);
    $('.modal-window .img-description').text(image.description);
    $('.modal-window .likes').text(image.likes + ' likes');

    $('.dark-wrapper').css('display', 'flex');
  }

  $('#btnRight').click(() => {
    let newIndexRight = currentImageIndex + 1;
    currentImageIndex = newIndexRight < images.length ? newIndexRight : images.length - 1;
    let image = images[currentImageIndex];

    $('.modal-window .img-active').attr('src', image.src);
    $('.modal-window .img-description').text(image.description);
    $('.modal-window .likes').text(image.likes +' likes');
  });

  $('#btnLeft').click(() => {
    let newIndexLeft = currentImageIndex - 1;
    currentImageIndex = newIndexLeft > 0 ? newIndexLeft : 0;
    let image = images[currentImageIndex];

    $('.modal-window .img-active').attr('src', image.src);
    $('.modal-window .img-description').text(image.description);
    $('.modal-window .likes').text(image.likes +' likes');
  });

  function addImagesToPage(imagesToRender) {
    for (let i = 0; i < imagesToRender.length; i+= imagesInRow) {
      let rowElement = $('<div class="images-wrapper"></div>');
      rowElement.append('<div class="column"></div>');

      for (let j = i; j < i + imagesInRow; j++) {
        let image = imagesToRender[j];

        if (image) {
          let imageElement = $(`<div class="image-section"><img src="${image.src}" class="active"></div>`);
          imageElement.click(() => { 
            currentImageIndex = j; 
            onImageClick(image);
          });
          rowElement.append(imageElement)
        } else {
          rowElement.append('<div class="column"></div>');
        }
      }

      rowElement.append('<div class="column"></div>');

      $('#container').append(rowElement);  
    }

    let renderedItemsCount = $('.image-section').length;

    if (renderedItemsCount < images.length) {
      showMoreBtn.css('display', 'block');
    } else {
      showMoreBtn.css('display', 'none');
    }
  }

  $('.close-button').click(() => {
    $('.dark-wrapper').css('display', 'none');
  });
}