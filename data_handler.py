import csv
import os

DATA_FILE_PATH = os.getenv('DATA_FILE_PATH') if 'DATA_FILE_PATH' in os.environ else 'data.csv'
DATA_HEADER = ['id', 'title', 'user_story', 'acceptance_criteria', 'business_value', 'estimation', 'status']
STATUSES = ['planning', 'todo', 'in progress', 'review', 'done']


def get_all_user_story():
    return get_csv_data()


def get_user_story(story_id):
    user_story = get_csv_data(story_id)

    # change input new line to the correct HTML code to display it in the edit textarea
    user_story['user_story'] = user_story['user_story'].replace('<br>', '&#10;')
    user_story['acceptance_criteria'] = user_story['acceptance_criteria'].replace('<br>', '&#10;')

    return user_story


def get_csv_data(one_user_story_id=None):
    """
    :param one_user_story_id:
        If given, it will act as a filter and return the dictionary of one specific User Story
        If not given, it will return a list of dictionaries with all the details
    :return:
    """
    #  create a temporary list to read each line
    user_stories = []

    #  open csv file to read
    with open(DATA_FILE_PATH, encoding='utf-8') as csvfile:
        #  use DictReader to directly create dictionaries from each lines in the csv file
        reader = csv.DictReader(csvfile)

        #  read all lines in csv file
        for row in reader:
            #  make a copy of the read row, since we can't modify it
            user_story = dict(row)

            #  allow multiline strings to display in HTML
            user_story['user_story'] = user_story['user_story']
            user_story['acceptance_criteria'] = user_story['acceptance_criteria']

            # if filtered, then just return this _found_ user story
            if one_user_story_id is not None and one_user_story_id == user_story['id']:
                return user_story

            #  store modified data in temporary list
            user_stories.append(user_story)

    # return the temporary list
    return user_stories


def add_user_story(story):
    existing_data = get_all_user_story()

    # set default status
    story['status'] = STATUSES[0]

    if len(existing_data) > 0:
        story['id'] = int(existing_data[-1]['id']) + 1
    else:
        story['id'] = 0

    add_user_story_to_file(existing_data, story, True)


def update_user_story(story):
    existing_data = get_all_user_story()

    add_user_story_to_file(existing_data, story, False)


def add_user_story_to_file(existing_data, story, append=True):
    # change input new line to the correct HTML tag
    story['user_story'] = story['user_story'].replace('\r\n', '<br>')
    story['acceptance_criteria'] = story['acceptance_criteria'].replace('\r\n', '<br>')

    with open(DATA_FILE_PATH, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=DATA_HEADER)
        writer.writeheader()

        for row in existing_data:
            # On updating an existing User Story, just overwrite the current line with the received data
            if not append:
                if row['id'] == story['id']:
                    row = story

            writer.writerow(row)

        if append:
            writer.writerow(story)
