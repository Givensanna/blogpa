$(function () {
    var APPLICATION_ID = "2DF71958-C153-B5B3-FFFA-1341058AA900",
    SECRET_KEY = "91802F4B-BF41-1389-FF8D-D8B054ED7A00",
    VERSION = "v1";
    
    Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);
    
    var postsCollection = Backendless.Persistence.of(Posts).find();
 
     console.log(postsCollection);
     
    var wrapper = {
        posts: postsCollection.data
    };
    
    Handlebars.registerHelper('format', function(time) {
        return moment(time).format("dddd, MMMM Do YYYY");
    });
    
    
    var blogScript = $("#blogs-template").html();
    var blogTemplate = Handlebars.compile(blogScript);
    var blogHTML = blogTemplate(wrapper); 
    
    $('.main-container').html(blogHTML);
    
}); 

function Posts (args) {
    args = args || {};
    this.title = args.title || "";
    this.content = args.content || "";
    this.authorEmail = args.authormail || "";
    
    
} 



$(document).on('click', '.add-blog', function() {
    var addBlogScript = $("#add-blog-template").html();
    var addBlogTemplate = Handlebars.compile(addBlogScript);
    
    $('.main-container').html(addBlogTemplate);
    });
   
    
    $(document).on('submit', '.form-add-blog', function (event) {
        event.preventDefault();
        
        var data = $(this).serializeArray(), 
            title = data[0].value, 
            content = data[1].value; 
            
            if (content === "" || title ==="") {
                Materialize.toast('cannot leave title or content empty!', 4000, 'rounded');
            }
            else {
         var dataStore = Backendless.Persistence.of(Posts); 
         
         var postObject = new Posts({
             title: title,
             content: content
         }); 
         
         dataStore.save(postObject); 
         this.title.value = "";
         this.content.value = "";
     }
    }); 
    
    function Posts (args) {
    args = args || {};
    this.title = args.title || "";
    this.content = args.content || "";
    this.authorEmail = args.authormail || "";
    
    
} 

$(document).on('click','.trash', function(event){
   console.log(event);
   Backendless.Persistence.of(Posts).remove(event.target.attributes.data.nodeValue);
   location.reload();
   Materialize.toast('task has been deleted', 4000);
});
