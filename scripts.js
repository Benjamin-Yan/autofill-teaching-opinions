function download() {
    
    var bookmarkUrls = document.getElementById("bookmark-urls").value;
    var bookmarkNames = document.getElementById("bookmark-names").value;

    if(!assert(bookmarkUrls) || !assert(bookmarkNames)) {
        alert("Don't type the HTML tag = =");
        return;
    }

    var output = `<!DOCTYPE NETSCAPE-Bookmark-file-1>
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmarks</TITLE>
<H1>Bookmarks</H1>
<DL><p>`

    bookmarkUrls = (bookmarkUrls === "") ? "老師教學認真有耐心!" : bookmarkUrls;
    bookmarkNames = (bookmarkNames === "") ? "無，繼續維持即可~" : bookmarkNames;

    var func = `javascript:(function()%7Bvar $radios = $(':radio[value=5]');\
$radios.attr('checked', !!'checked');\
document.getElementById('ContentPlaceHolder1_Q_23').textContent= '${bookmarkUrls}';\
document.getElementById('ContentPlaceHolder1_Q_24').textContent= '${bookmarkNames}';\
document.getElementById('ContentPlaceHolder1_Q_12_0').checked = true;\
document.querySelectorAll('input[type=%22submit%22]')[0].click(); %7D)()` // ues %22 to replace the "

    // Add bookmark to output
    var bookmark = `
    <DT><A HREF="${func}">自動填寫教學意見</A>`;
    output = output.concat(bookmark);

    // Close final tag
    output = output.concat( `
        </DL><p>`);
    
    // Build downloadable .html file with content from output variable
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(output));
    element.setAttribute('download', "教學意見填寫.html");
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}

document.getElementById("bookmark-urls").placeholder = `預設: 老師教學認真有耐心!`;

document.getElementById("bookmark-names").placeholder = `預設: 無，繼續維持即可~`;

function assert(val) {
    const regex = /(<(\/)*([a-zA-Z]+)(\s\/)*(\/)*>)|<link|<img([\w\W]+?)\/>/gi;
    if(regex.test(val)) {
        return false;
    }
    return true;
}

