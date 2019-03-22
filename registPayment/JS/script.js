$(document).ready(()=>{
	()=>{
        $.ajax(
            {
                url: "../Resources/regis.json", 
                success: function(result){
                    $("main").html(result);
                }
            }
        );
    }
});