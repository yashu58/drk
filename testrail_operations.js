var Client = require('node-rest-client').Client;
var url="https://type.testrail.com/index.php?/api/";
var auth="Basic dGFydW4ua3VtYXJAbW9ub3R5cGUuY29tOlRlc3RyYWlsLmNvbUAxMjM=";
var percentage;
var async = require('async');
var Q=require('q');

var args = {
        headers:
        {
                "Content-Type": "application/json",
                "Authorization":auth.toString()
        }
};


getProjectIdFromResponse = function(data,name)
{
        var Id=[];
        for (var i = 0, len = data.length; i < len; i++) {
                if(data[i].name.toString().toLowerCase().indexOf(name.toString().toLowerCase()) != -1)
                {
                        Id.push({
                                key: data[i].name,
                                value: data[i].id}
                        );
                        console.log(new Date() + " Matched Element - " + data[i].id + ". " + data[i].name);                        
                }				
        }
        return Id;
}

getProjectId = function (name,callback)
{
        var getProjects_url=url + "v2/get_projects";
	var Id=[];
        try
        {
                client = new Client();
                client.get(getProjects_url, args, function(data, response)
                {       
                        var getProjectID_Promise=Q.denodeify(getProjectIdFromResponse);
                        var result=getProjectIdFromResponse(data,name);                        
                        result.then
                        {                                
                                callback(result);
                        }
                });
        }
        catch(err)
        {
                console.log("Error = " + err);
        }
}
      
getRunDetails = function (id,choice,callback)
{      
        var runDetails=[];
        var getRuns_url=url + "v2/get_runs/" + id;                
        try
        {
                client = new Client();
                client.get(getRuns_url,args,function(data,response)
                {                        
			if(data.length!=0)
                        {
                        switch(choice)
                        {
                        case 1:                 
                        for(var i=0;i<10;i++)
                        {      
                                console.log("Run Name = " + data[i].name);
                                var percentage=(data[i].passed_count*100)/(data[i].passed_count+data[i].failed_count);
                                runDetails.push({
                                key: data[i].name,
                                value: percentage
                                });
                        }
                        callback(runDetails);
                        break;
                        case 2:
                        for(var i=0;i<10;i++)
                        {       if(data[i].is_completed==true)
                                {
                                        console.log("Run Name = " + data[i].name);
                                        var percentage=(data[i].passed_count*100)/(data[i].passed_count+data[i].failed_count);
                                        runDetails.push({
                                        key: data[i].name,
                                        value: percentage
                                        });
                                }
                        }
                        callback(runDetails);
                        break;
                        case 3:
                        for(var i=0;i<10;i++)
                        {       if(data[i].is_completed==false)
                                {
                                        console.log("Run Name = " + data[i].name);
                                        var percentage=(data[i].passed_count*100)/(data[i].passed_count+data[i].failed_count);
                                        runDetails.push({
                                        key: data[i].name,
                                        value: percentage
                                        });
                                }
                        }
                        callback(runDetails);
                        break;
                        }
                        } 
                        else
                        {
                                consol.log("Oops..! There is no runs associated to Your Project");
                        }       
                });
                
        }
        catch(err)
        {
                console.log(err);
        }
}