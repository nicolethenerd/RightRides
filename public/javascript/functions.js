var item_global;
function getSpreadSheetData(){
	var rssurl = "https://spreadsheets.google.com/feeds/spreadsheets/private/full";
	$.get(rssurl, function(data) {
		var $xml = $(data);
		$xml.find("item").each(function() {
			item_global = $(this);
			//Do something with item here...
		});
	});
}
