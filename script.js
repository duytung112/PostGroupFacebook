		$("#start-spam").click(e => {
		    var counter = 0;
		    var countPost = 0;
		    let messages = $('#spam-message').val().split('|');
		    let targets = $('#spam-target').val().split(';');
			let timer = $('#spam-timer').val()*1000;
		    targets.forEach(target => {
		        counter++;
		        setTimeout(() => {
		            let mess = messages[~~(Math.random() * messages.length)];
		            $.post("https://graph.facebook.com/" + target + "/photos", {
		                access_token: $('#access-token').val(),
		                message: mess,
		                url: $('#spam-attachment').val()
		            }).then(dataPost => {
		                countPost++;
		                var link = "https://www.facebook.com/" + dataPost.post_id;
		                $('#logText').append('<span style="color: green;">Posted ' + countPost + ' on <a href="' + link + '" target="_blank">' + dataPost.post_id + '</a></span><br/>');
		                if (countPost === targets.length) {
		                    timeOutDone();
		                };
		            }).fail(() => {
		                countPost++;
		                var link = "https://www.facebook.com/" + target;
		                $('#logText').append('<span style="color: red;">Failed to post ' + countPost + ' on <a href="' + link + '" target="_blank">' + target + '</a></span><br/>');
		                if (countPost === targets.length) {
		                    timeOutDone();
		                };
		            });
		        }, counter * timer);
		    });
		    $('#logText').append('<span style="color: black;font-weight: bold;"> - - - - START - - - -</span><br/>');
		});

		$("#clean-spam").click(e => {
		    $('#logText').html("");
		});

		$("#group-spam").click(e => {
		    var groupsId = '';
		    $('#logText').html("");
		    $.get("https://graph.facebook.com/me/groups", {
		        access_token: $('#access-token').val()
		    }).then(dataGet => {
		        console.log(dataGet);
		        dataGet.data.forEach(groupId => {
		            groupsId += ';' + groupId.id;
		        });
		        $('#logText').html(groupsId.substring(1, groupsId.length));
		    }).fail(() => {
		        $('#logText').append('<span style="color: red;"> - - - - Failed - - - -</span><br/>');
		    });
		});

		function timeOutDone() {
		    $('#logText').append('<span style="color: blue;"> - - - - DONE - - - -</span><br/>');
		};