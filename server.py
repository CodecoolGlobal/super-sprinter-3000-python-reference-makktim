from flask import Flask, render_template, request, redirect, url_for

import data_handler

app = Flask(__name__)


@app.route('/')
@app.route('/list')
def route_list():
    user_stories = data_handler.get_all_user_story()

    return render_template('list.html', user_stories=user_stories)


@app.route('/story', methods=['GET', 'POST'])
def route_story_add():
    if request.method == 'POST':
        data_handler.add_user_story(request.form.to_dict())  # Cast received Form data to normal Python dictionary
        return redirect('/')

    return render_template('user_story.html',
                           user_story={
                               'business_value': 500,
                               'estimation': 2,
                           },
                           form_url=url_for('route_story_add'),
                           page_title='Add User Story',
                           button_title='Add new User Story',
                           )


@app.route('/story/<story_id>', methods=['GET', 'POST'])
def route_story_update(story_id: int):
    if request.method == 'POST':
        data_handler.update_user_story(request.form.to_dict())
        return redirect('/')

    user_story = data_handler.get_user_story(story_id)
    return render_template('user_story.html',
                           user_story=user_story,
                           statuses=data_handler.STATUSES,
                           form_url=url_for('route_story_update', story_id=story_id),
                           page_title='Update User Story',
                           button_title='Update User Story',
                           )


if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=8000,
        debug=True,
    )
