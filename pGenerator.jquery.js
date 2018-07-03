/*!
 * pGenerator jQuery Plugin v2.0.0
 * https://github.com/CrazyEnimal/PasswordGenerator
 *
 * Created by Mihai MATEI <mihai.matei@outlook.com>
 * Released under the MIT License (Feel free to copy, modify or redistribute this plugin.)
 *
 * Modified for use in ProcessWire Password Generator module by Pavel Druzhinin after (Robin Sallis)
 */

(function($){

    var numbers_array       = [],
        upper_letters_array = [],
        lower_letters_array = [],
        special_chars_array = [],
        $pGeneratorElement  = null;

    /**
     * Plugin methods.
     *
     * @type {{init: init, generatePassword: generatePassword}}
     */
    var methods = {

        /**
         * Initialize the object.
         *
         * @param options
         * @param callbacks
         *
         * @returns {*}
         */
        init: function(options, callbacks)
        {
            var settings = $.extend({
                'bind': 'click',
                'passwordElement': null,
                'displayElement': null,
                'passwordLength': 16,
                'uppercase': true,
                'lowercase': true,
                'numbers':   true,
                'specialChars': true,
                'mask': '',
                'additionalSpecialChars': [],
                'onPasswordGenerated': function(generatedPassword) { }
            }, options);

            // Exclude 0, 1, I, L, l
            var excluded_chars = [48, 49, 73, 79, 108];

            for(var i = 48; i < 58; i++) {
	            if(excluded_chars.indexOf(i) !== -1) continue;
                numbers_array.push(i);
            }

            for(i = 65; i < 91; i++) {
	            if(excluded_chars.indexOf(i) !== -1) continue;
                upper_letters_array.push(i);
            }

            for(i = 97; i < 123; i++) {
	            if(excluded_chars.indexOf(i) !== -1) continue;
                lower_letters_array.push(i);
            }

            special_chars_array = [33, 35, 36, 37, 40, 41, 42, 43, 45, 46, 47, 61, 63, 64, 94, 95].concat(settings.additionalSpecialChars);

            return this.each(function(){

                $pGeneratorElement = $(this);

                $pGeneratorElement.bind(settings.bind, function(e){
                    e.preventDefault();
                    methods.generatePassword(settings);
                });

            });
        },

        /**
         * Generate the password.
         *
         * @param {object} settings
         */
        generatePassword: function(settings) {
            // if mask not entered
            if(settings.mask == '' || !settings.mask){
                var password = new Array(),
                    passwordMask = new Array(),
                    selOptions = settings.uppercase + settings.lowercase + settings.numbers + settings.specialChars;
               var optionLength = Math.floor(settings.passwordLength / selOptions);
                
                if(settings.uppercase) {
                    // uppercase letters
                    for(var i = 0; i < optionLength; i++) {
                        passwordMask.push('u');
                    }
                }
    
                if(settings.numbers) {
                    // numbers letters
                    for(var i = 0; i < optionLength; i++) {
                        passwordMask.push('d');
                    }
                }
    
                if(settings.specialChars) {
                    // special chars
                    for(var i = 0; i < optionLength; i++) {
                        passwordMask.push('s');
                    }
                }
    
                var remained = settings.passwordLength - passwordMask.length;
    
                if(settings.lowercase) {
    
                    for(var i = 0; i < remained; i++) {
                        passwordMask.push('l');
                    }
    
                } else {
    
                    for(var i = 0; i < remained; i++) {
                        passwordMask.push(passwordMask[randomFromInterval(0, passwordMask.length - 1)]);
                    }
                }
                
                passwordMask = shuffle(passwordMask);
                
            } else {
                var password = new Array();
                var passwordMask = settings.mask.split('');
            }
            
            passwordMask.forEach(function(m) {
                switch(m) {
                    case 'u':
                        password.push(String.fromCharCode(upper_letters_array[randomFromInterval(0, upper_letters_array.length - 1)]));
                        break;
                    case 'l':
                        password.push(String.fromCharCode(lower_letters_array[randomFromInterval(0, lower_letters_array.length - 1)]));
                        break;
                    case 'd':
                        password.push(String.fromCharCode(numbers_array[randomFromInterval(0, numbers_array.length - 1)]));
                        break;
                    case 's':
                        password.push(String.fromCharCode(special_chars_array[randomFromInterval(0, special_chars_array.length - 1)]));
                        break;
                }
            });
            
            password = password.join('');
            
            if(settings.passwordElement !== null) {
                $(settings.passwordElement).val(password);
            }

            if(settings.displayElement !== null) {
                if($(settings.displayElement).is("input")) {
                    $(settings.displayElement).val(password);
                } else {
                    $(settings.displayElement).text(password);
                }
            }

            settings.onPasswordGenerated(password);
        }
    };

    /**
     * Shuffle the password.
     *
     * @param {Array} o
     *
     * @returns {Array}
     */
    function shuffle(o)
    {
        for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);

        return o;
    }

    /**
     * Get a random number in the given interval.
     *
     * @param {number} from
     * @param {number} to
     *
     * @returns {number}
     */
    function randomFromInterval(from, to)
    {
        return Math.floor(Math.random()*(to-from+1)+from);
    }

    /**
     * Define the pGenerator jQuery plugin.
     *
     * @param method
     * @returns {*}
     */
    $.fn.pGenerator = function(method)
    {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
        else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.pGenerator' );
        }
    };

})(jQuery);
