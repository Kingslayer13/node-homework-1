$ <- j-query

prepare-templates!

send '/files' .done add-files

$ \#files-list .on \click \.remove ({current-target: link}) ->
    send link .done remove-file
    false

$ \#add-file-form .on \submit ->
    send this .done add-file
    false

#region==================== Utils =========================================

/**
 * detach all templates from DOM
 */
function prepare-templates()
    template.file = $ \#clone .prop 'id', '' .detach!

function template(name)
    return template[name]

/**
 * @param name
 * @returns {jQuery}
 */
function get-file(name)
    return $ "\#files-list [data-name='#name']"

/**
 * @param {String} name
 * @returns {jQuery}
 */
function add-file(name)
    file = get-file name
    if file.length > 0 then return file

    template.file.clone!
        ..attr \data-name name
        ..find \.name   .html name
        ..find \.remove .prop \href -> @href.replace /:fileName/g name
        ..append-to \#files-list

/**
 * @param {Array} names
 * @returns {jQuery}
 */
function add-files(names)
    files = $ []
    for name in names
        files .= add add-file name

    return files

/**
 * @param name
 * @returns {jQuery}
 */
function remove-file(name)
    return get-file name .remove!

/**
 * @param {XMLHttpRequest} response
 */
function show-response({response-text})
    alert response-text

/**
 * @param {HTMLFormElement|HTMLAnchorElement|String} target
 * @returns {jqXHR}
 */
function send(target)
    if target instanceof HTMLAnchorElement
        target .= href

    if target instanceof String
        return $.get target .fail show-response

    {action, method} = target

    return $.ajax do
        url:  action
        type: method
        data: $ target .serialize!
        error: show-response

#endregion