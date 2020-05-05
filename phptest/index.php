<?php
date_default_timezone_set('UTC');

if (!class_exists('nextShowDate')) require_once 'libs/next_show_date.php';

$next_date = '';

// Update "Next date" field when the form is submitted
if (isset($_POST['get_next_show']) && !empty($_POST['get_next_show']) && (bool) $_POST['get_next_show']) {
    // Get input date (current datetime if empty)
    $current_date = $_POST['input_date'] ? htmlspecialchars($_POST['input_date'], ENT_QUOTES, 'UTF-8') : date('Y-m-d H:i:s');

    // Create a new object with the input date
    $onextShowDate = new nextShowDate($current_date);

    // Calculate next valid date and update
    $next_date = $onextShowDate->getNextDate();
}

?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="user-scalable=yes,width=device-width,minimum-scale=1,initial-scale=1">
    <!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=edge" /><![endif]-->

    <title>Watch New Episodes</title>
    <meta content="Find out when new episodes are coming out.">

    <link rel='stylesheet' href='phptest.css' type='text/css' media='all' />
</head>

<body>
<div id="page_wrapper">

    <form method="POST">
        <input type="hidden" name="get_next_show" value="1" />
        <input type="datetime" name="input_date" value="" />

        <button type="submit">Get new episode date</button>
    </form>

    <br />

    <div>Next date: <?php echo $next_date; ?></div>

    <br /><hr />

</div>

</body>
</html>