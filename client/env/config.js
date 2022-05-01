// All this is doing is inserting the parse API keys into every $.ajax
// request that you make so you don't have to.

// Put your parse application keys here!
$.ajaxPrefilter(function (settings, _, jqXHR) {
  jqXHR.setRequestHeader('Authorization', 'GITHUB_API_TOKEN');
});

// Put your campus prefix here
window.CAMPUS = 'FILL_ME_IN';


// $.ajaxPrefilter(function (settings, _, jqXHR) {
//   jqXHR.setRequestHeader('Authorization', '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');
// });

// // Put your campus prefix here
// window.CAMPUS = 'rfp';
