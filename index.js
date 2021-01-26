function seeMore(n) {
  var seeMore = document.querySelectorAll(".see-more");
  var moreItems = document.querySelectorAll(".more-items");

    for (let i = 0; i < seeMore.length; i++) {
      seeMore[i].innerHTML = '<a onclick="seeMore('+ (i+1) +')">See more...</a>';
    }
    seeMore[n-1].innerHTML = '<a onclick="seeMore('+ n +')">See less...</a>';

    
    if (moreItems[n-1].classList.contains('dis-flex')) {
      seeMore[n-1].innerHTML = '<a onclick="seeMore('+ n +')">See more...</a>';
      moreItems[n-1].classList.replace('dis-flex', 'no-md');
      moreItems[n-1].style.transition = '5s';
    } else {
      for (let i = 0; i < moreItems.length; i++) {
        moreItems[i].classList.replace("dis-flex", "no-md");
      }
      moreItems[n-1].classList.replace("no-md", "dis-flex");
      moreItems[n-1].style.transition = '5s';
    }
}