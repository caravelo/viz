# Caravelo Viz [![Build Status](https://secure.travis-ci.org/michaux/cvo-viz.png?branch=master)](http://travis-ci.org/michaux/cvo-viz)

Business intelligence visualization components for Keen.io

## Installation

[TBD]

## Usage

Look through the following snippets to grasp a feeling of the usage.

```javascript
// (1) Declare your Keen clients
var client = new Keen({
  projectId: '[PROJECT_ID]',
  readKey: '[READ_KEY]'
});

Keen.ready(function() {

    // (2) Define your Keen queries
    var kpi1 = new Keen.Query('count', {
      eventCollection: 'collection_name',
      timeframe: 'previous_12_months',
      filters: [{
        property_name: 'event',
        operator: 'eq',
        property_value: 'KPI1'
      }],
      interval: 'monthly'
    });
    var kpi2 = new Keen.Query('count', {
      eventCollection: 'collection_name',
      ...
    });

    // (3) Draw your scorecard
    new Viz.Scorecard('#sc01').draw([{
      name: 'KPI 1',
      client: client,
      query: kpi1,
      meta: {
        bullet: { target: 1500 }
      }
    }, {
      name: 'KPI 2',
      client: client,
      query: kpi2,
      meta: {
        bullet: { target: 500 }
      }
    }]);

});
```

```html
<html>
  <head>
       ...
      <link rel="stylesheet" type="text/css" href="assets/css/cvo-viz.min.css"/>
  </head>
  <body>
    ...
    <!-- Scorecard table -->
    <table id="sc01">
       <thead>
        <tr>
          <th>Trailing Year</th>
          <th>Metric</th>
          <th>% of Target</th>
          <th>Last Month</th>
          <th>MoM</th>
        </tr>
       </thead>
       <tbody>
       <tr data-kpi-template>
        <td class="kpi-sparkline"></td>
        <td class="kpi-title"></td>
        <td>
           <div class="kpi-bullet-value"></div>
           <div class="kpi-bullet"></div>
        </td>
        <td class="kpi-last-value"></td>
        <td><span class="kpi-delta"></span></td>
      </tr>
      </tbody>
    </table>
    ...
    <!-- JS dependencies -->
    <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
    <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/keen-js/3.2.7/keen.min.js"></script>
    <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jquery-sparklines/2.1.2/jquery.sparkline.min.js"></script>
    <script type="text/javascript" src="assets/cvo-viz.min.js"></script>
    <script type="text/javascript" src="my-dashboard.js"></script>
  </body>
</html>
```

Browse the `examples` folder for complete use cases.

## Components

### Scorecards

Scorecards display progress over time. They allow you to display state indicators and provide visual feedback linked to your KPIs. Having a fast and easy way to determine the status of a business metric makes it far easier to take action and make appropriate decisions more quickly and accurately.

*Screenshot*
[TBD]

*Configuration Options*
[TBD]

*Supported Keen Queries*
[TBD]

*Expected Markup*
[TBD]

### Funnels

[TBD]
