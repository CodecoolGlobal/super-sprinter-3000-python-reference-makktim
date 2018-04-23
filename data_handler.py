import csv
import os

DATA_FILE_PATH = os.getenv('DATA_FILE_PATH') if 'DATA_FILE_PATH' in os.environ else 'data.csv'
DATA_HEADER = ['id', 'title', 'user_story', 'acceptance_criteria', 'business_value', 'estimation', 'status']
STATUSES = ['planning', 'todo', 'in progress', 'review', 'done']
DEFAULT_STATUS = STATUSES[0]


def get_all_user_story(convert_linebreaks=False):
    all_stories = get_csv_data()

    if convert_linebreaks:
        for user_story in all_stories:
            #  allow multiline strings to display in HTML
            user_story['user_story'] = convert_linebreaks_to_br(user_story['user_story'])
            user_story['acceptance_criteria'] = convert_linebreaks_to_br(user_story['acceptance_criteria'])

    return all_stories


def get_user_story(story_id):
    return get_csv_data(story_id)


def get_next_id():
    existing_data = get_all_user_story()

    if len(existing_data) == 0:
        return '1'

    return str(int(existing_data[-1]['id']) + 1)


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

            # if filtered, then just return this _found_ user story
            if one_user_story_id is not None and one_user_story_id == user_story['id']:
                return user_story

            #  store modified data in temporary list
            user_stories.append(user_story)

    # return the temporary list
    return user_stories


def add_user_story(story):
    # set id and default status
    story['id'] = get_next_id()
    story['status'] = DEFAULT_STATUS

    add_user_story_to_file(story, True)


def update_user_story(story):
    add_user_story_to_file(story, False)


def add_user_story_to_file(story, append=True):
    """
    Save a new or update an existing user story in the csv file.
    :param story: The user story we'd like to save
    :param append: Is this a new story that should be appended to the end of the file?
    :return: -
    """
    existing_data = get_all_user_story()

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


def convert_linebreaks_to_br(original_str):
    return '<br>'.join(original_str.split('\n'))
