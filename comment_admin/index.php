<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Classic Products Roofing Systems Inc.</title>

    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/admin.css" rel="stylesheet">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
  	<div id="top" class="container">
	    <h1>Add a new comment <small>(To edit a comment first select "edit" from the list at the bottom of the page.)</small></h1>
	    <hr>
	    <form role="form" class="input-form" onsubmit="return false;">
	    	<input type="hidden" id="index">
		    <h2>Customer Information</h2>
		     <div class="customer-information row">
		     	<div class="col-sm-6">
			     	<div class="form-group">
				     	<label for="first_name">First Name:</label>
				     	<input class="form-control" id="first_name">
			     	</div>
			    </div>
			    <div class="col-sm-6">
			     	<div class="form-group">
			     		<label for="last_name">Last Name:</label>
			     		<input class="form-control" id="last_name">
			     	</div>
			     </div>
			    <div class="col-sm-6">
				    <div class="form-group">
				     	<label for="email">Email:</label>
				     	<input class="form-control" id="email">
			     	</div>
			    </div>
			    <div class="col-sm-6">
			     	<div class="form-group">
				     	<label for="date">Date:</label>
				     	<input class="form-control" type="date" id="date">
			     	</div>
			    </div>
			    
		     </div>
		    <h2>Comments</h2>
		    <div class="comments">
		    	<div class="comment-section">
			     	<div class="form-group">
				    	<label for="comment_0">Comment 1:</label>
				    	<textarea class="form-control" id="comment_0"></textarea>
				    </div>
				    <div class="form-group">	
				    	<label for="category_0">Category:</label>
				    	<select class="form-control" id="category_0">
				    		<option>Sales Knowledge</option>
							<option>Professionalism</option>
							<option>Communication</option>
							<option>Installation Team</option>
							<option>Material Quality</option>
							<option>Workmanship Quality</option>
							<option>Cleanliness / Safety</option>
							<option>Job Satisfaction</option>
							<option>Addressing Work Issues</option>
							<option>Schedule</option>
							<option>Value</option>
							<option>Likely to Recommend</option>
							<option>Improvement Areas</option>    	
				    	</select>
				    </div>
				</div>
		    </div>
		    <a class="add-comment">Add a comment</a>
		    <h2>Location</h2>
		    <div class="location">
		    	 <div class="form-group">	
			    	<label for="address">Address:</label>
			    	<div class="row">
				    	<div class="col-sm-10"><input class="form-control" id="address"></div>
				    	<div class="col-sm-1"><button class="btn btn-addr">Find Address</button></div>
			    	</div>
			    	<div class="map-div">
			    	</div>
			    	<input type="hidden" id="lat">
			    	<input type="hidden" id="lng">
			 	 </div>
		    </div>
		    <button class="btn btn-clear">Clear Form</button>
		    <button class="btn btn-save">Save</button>
	    </form>
	</div>
	<div class="container">
		<h1>Comments</h1>
		<table class="table table-striped comments-table">
			<tbody><tr><td>none yet.</td></tr></tbody>
		</table>
	</div>
	<div class="alert alert-dismissible alert-success alert-saved" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>Saved!</div>
	
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
	<script src="../jsrender.min.js"></script>
	<script id="comment_template" src="comment_table_template.jst"></script>
	<script id="comment_template" src="comment_template.jst"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/admin.js"></script>
  </body>
</html>
<?php
