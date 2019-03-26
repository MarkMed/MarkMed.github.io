$(document).ready(()=>{
	()=>{
        $.ajax(
            {
                type: get,
                url: "../Resources/regis.json", 
                success: function(result){
                    $("main").html(result);
                }
            }
        );
    }
});