/*
 * Example plugin template
 */

jsPsych.plugins['jspsych-partner-message2'] = (function () {

  var plugin = {};

  plugin.info = {
    name: 'jspsych-partner-message2',
    prettyName: 'Message Splash',
    parameters: {
      section2_text: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Section 2 text',
        description: 'STRING: text for section 2 (explanation / paragraph format).'
      },
      img_id: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Image ID',
        description: 'STRING: HTML object ID for image object in section 2.'
      },
      buttonText: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Button text',
        default: 'START',
        description: 'STRING: text for trial finish button.'
      },
    }
  };

  plugin.trial = function (display_element, trial) {
    // clear display element and apply page default styles
    display_element.innerHTML = '';
    $('body')
        .css('height', 'auto')
        .css('background-color', 'black')
        .css('overflow-y', 'auto');
    //delay display (to give impression of searching for partner)
    setTimeout(function() {
      $('body').css('visibility', 'visible');
    }, 1000);
    $.scrollify.enable();
    $.scrollify.destroy();

    // make sure page starts at the top every time
    removeHash();
    removeQueryString();



    /* SECTION 2: Overview */
    var section2 = createGeneral(
        section2,
        display_element,
        'section',
        'tutorial-section section2',
        'notice-section2',
        ''
    );


    //align screen color to partner marker color
    // if (partnerOrder > 0.5) {   //this means first underconfident, then overconfident partner (which partnerOrder is randomized but now we are at partner 2)
    //   section2.style.backgroundColor = color2;      //underconfident partner has color1 (which color this is is randomized)
    // } else {
    //   section2.style.backgroundColor = color1;      //overconfident partner has color2 (which color this is is randomized)
    // }


    var section2_image = createGeneral(
        section2_image,
        section2,
        'div',
        'gameboard-gif',
        trial.img_id,
        ''
    );

    var section2_title = createGeneral(
        section2_title,
        section2,
        'div',
        'tutorial-text',
        'notice-text2',
        '<div id="section2-text">' + trial.section2_text + '</div>'
    );

    $('#notice-text2').css('font-size', '2.8vmax');
    $('#notice-text2').css('line-height', '3.5vmax');

    var continueButton = createGeneral(
        continueButton,
        section2,
        'button',
        'default-green-button',
        'notice-' + trial.buttonText + '-button',
        trial.buttonText
    );

    continueButton.onclick = function () {
      jsPsych.finishTrial();
      return;
    }

    // make sure page starts at the top every time
    // console.log('reached bottom');
    $('html, body').animate({
      scrollTop: $('#notice-section1').offset().top
    }, 1);
  }; // close plugin.trial

  return plugin;
})(); // close the plugin as an anonymous function