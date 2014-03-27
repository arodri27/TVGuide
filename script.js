(function( tvguide , $ ) {

	tvguide.assignment2 = function() {
	
		$("#logo").append("<img id='logoGif' src='tvguide_logo_tat.gif' />");
		
		// When clicking the button
		$("#loadData").on("click", function (){
		
			$('#upcomingEpisodes').css('padding', '15px');
			$('#interestingShows').css('padding', '15px');
						
			$("<div id='episodesHeader'><h1>Upcoming Episodes</h1></div>").insertAfter($("#logo"));
			$("<div id='showsHeader'><h1>Shows</h1></div>").insertAfter($("#episodesHeader"));
			
		
			// I read the upcoming episodes
			$.ajax( {type: "GET", url:"episodes.json", contentType: "application/json; charset=utf-8"}).done(
					
			//When The AJAX RETURNS
			function(data) { 
				var parsed = data;
				
				$(parsed).each( function(i,val) {
				
					$('#upcomingEpisodes').append(
						$("<div class='episode'></div>").append(
							$("<p class='title'>"+ val.episode.title +"</p>"),
							$("<p class='subtitle'><span class='show'>"+ val.show.title + " - </span>" +
							"<span class='season'>Season " + val.episode.season + "</span>" +
							"<span class='episodeNumber'> - Episode " + val.episode.episode + "</span>" +
							"</p>"),
							$("<img class='preview' src="+ val.episode.images.screen +" />")
						)
					);
														
				});
				
			});
			
			
						
			$.ajax( {url:"shows.json"}).done(
					
			//When The AJAX RETURNS
			function(data) { 
				var parsed = data;
								
				$(parsed).each( function(i,val) {
				
					$('#interestingShows').append(
						$("<p class='showTitle'>"+ val.title +"</p>"),
						$("<p class='showDescription" + i + "'></p>"),
						$("<button type='button' id=" + i + ">More info</button>").appendTo('#interestingShows')
					);
					
					$(".showDescription"+i).text(val.overview);
					if ($(".showDescription"+i).text().length > 200){
						$(".showDescription"+i).text(val.overview.substr(0,200)+"...");
					}
					
					// Display more info when clicking the button
					$("#"+i).on("click", function (){
						$(".showDescription"+i).text(val.overview);
						$("<div class='hidden'><img class='poster' src=" + val.images.poster +" />" + "<br />" +
							"<span class='rating'>Percentage: "+ val.ratings.percentage +"</span>" +  "<br />" +
							"<span class='votes'>Total votes: "+ val.ratings.votes +"</span>" +  "<br />" +
							"<button type='button' id=less" + i + ">Less info</button>" +
						"</div>").insertAfter($("#"+i));
						$("#"+i).css('visibility', 'hidden');
						
						$("#less"+i).on("click", function (){
							$(".hidden").remove();
							$("#"+i).css('visibility', 'visible');
							$(".showDescription"+i).text(val.overview);
							if ($(".showDescription"+i).text().length > 200){
								$(".showDescription"+i).text(val.overview.substr(0,200)+"...");
							}
						});
						
					});
					
				});
				
			});;
						
			$("#loadData").remove();
			$("#upcomingEpisodes, #interestingShows").wrap("<div id='content'></div>");
			$("<div id='buttonContainer'><button type='button' id='changeColor'>Highlight season!</button></div>").insertBefore('#upcomingEpisodes');
			
			$("#changeColor").on("click", function (){
				$('#upcomingEpisodes .episode .subtitle .season').css('color', '#BC1D20');
				$('#upcomingEpisodes .episode .subtitle .season').css('font-weight', 'bold');
			});
			
								
		});
		
		
		
	};

	//invoke it on page ready
	$(document).ready(tvguide.assignment2);


})(window.tvguide = window.tvguide || {}, jQuery)