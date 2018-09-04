function sendToSlack(message) {
    var token = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN');
    var slackApp = SlackApp.create(token);
    slackApp.postMessage("#bot-test", message, {
        username: "KintaiBot",
        icon_url: "https://www.silhouette-illust.com/wp-content/uploads/2016/11/17380-300x300.jpg"
    });
}