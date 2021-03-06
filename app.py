from flask import Flask, render_template, request, redirect, session, g, flash, jsonify
from datetime import timedelta
import mysql.connector
import json
import requests
# HEADERS = {'Content-Type': 'text/html; charset=utf-8', }
mydb = mysql.connector.connect(host='localhost',
                               user='k',
                               password='kpython',
                               database="test"
                               )
app = Flask(__name__)
app.secret_key = 'secretkey'
app.permanent_session_lifetime = timedelta(minutes=10080)
cursor = mydb.cursor()

web_info = {
    'signin_t': '歡迎光臨，請輸入帳號密碼',
    'member_t': '歡迎光臨，這是會員頁面',
    'signup_t': '歡迎光臨，註冊成功',
    'error_t': '失敗頁面',
    'signout_t': '已登出',
}


@app.before_request
def before_request():
    g.name = '您'
    if 'name' in session:
        name = session['name']
        g.name = name
        # print(f'g.name{g.name}')
    if 'username' in session:
        user_name = session['username']
        g.username = user_name
        print(f'g.username   global:{g.username}')


@app.route('/')
def home():
    return render_template('home.html',
                           web_info=web_info)


@app.route('/signin', methods=['POST', 'GET'])
def signin():
    # print(request.form)
    if request.method == 'POST' and 'username' in request.form and 'password' in request.form:
        username = request.form.get('username')
        password = request.form.get('password')

        cursor.execute(
            'SELECT * FROM user WHERE username = %s AND password = %s', (username, password))
        result = cursor.fetchall()
        # print(f'signin{result}')
        if result:
            name = result[0][1]
            session.permanent = True
            session['name'] = name
            flash(f'Hi~ {name} 登入中～')
            # print(f'result: {name}')
            return redirect('/member/')
        else:
            error3 = '帳號密碼輸入錯誤'
            return render_template('error.html', error3=error3)


@ app.route('/signup', methods=['POST', 'GET'])
def signup():
    if request.method == 'POST' and 'username' in request.form and 'password' in request.form and 'name' in request.form:
        name = request.form.get('name')
        username = request.form.get('username')
        password = request.form.get('password')
        password2 = request.form.get('password2')

        cursor.execute('SELECT * FROM user WHERE username = %s', (username,))
        result = cursor.fetchone()
        # print(f'signup{result}')
        if result:
            error1 = '帳號已經被註冊.'
            return render_template('error.html', error1=error1)
        elif password != password2:
            error2 = '密碼輸入不同'
            return render_template('error.html', error2=error2)
        else:
            query = "INSERT into user(name, username, password) VALUES (%s,%s,%s)"
            cursor.execute(query, (name, username, password))
            mydb.commit()
            flash(f'{name} 成功註冊系統～')
            return redirect('/')


@ app.route('/signout')
def signout():
    if 'name' in session:
        name = session['name']
        flash(f'{name} bye bye 您登出啦～')
    session.pop('name', '您')
    if 'username' in session:
        username = session['username']
    session.pop('name', '')
    return render_template('home.html',
                           web_info=web_info
                           )


@ app.route('/error/')
def error():
    msg = request.args.get('message', '有error')
    message = 'errorrrrrrr'
    if msg == '1':  # /?message=1
        msg = '帳號或密碼輸入錯誤'

    return render_template('error.html',
                           web_info=web_info,
                           msg=msg
                           )


@ app.route('/api')
def api_qr():  # ?username=ply
    user_api = request.args.get('username', '')  # /api?username=ply
    if user_api:
        cursor.execute(
            'SELECT name FROM user where username = %s', (user_api,))
        result = cursor.fetchone()
        if result == None:
            return '<h1>查無此人</h1>'
        return (f'make_api{result}')


@app.route('/api/users', methods=['POST', 'GET'])
def make_api():  # ?username=ply  #charset='utf-8'
    # /api/users?username=ply
    try:
        user_api = request.args.get('username', '{"data": null}')
        if user_api:
            cursor.execute(
                'SELECT * FROM user where username = %s', (user_api,))
            print(
                f" user/api : {'SELECT * FROM user where username = %s', (user_api,)}")
            result = cursor.fetchone()
            # print(f'api/users{result}')

            user_name = user_api
            # session.permanent = True
            session['username'] = user_name
            data = (
                {"data": {'id': result[0], 'name': result[1], 'username': result[2]}})
            # print(f'user_api{data}')
            # print(f'http://127.0.0.1:3000/api/users?username={user_api}')
            return data
    except:
        # else:
        return '{"data": null}'


@app.route('/api/user', methods=['POST', 'GET'])
def change_name_api():
    try:
        print(f'g.username   local:{g.username}')
        change_name_api = request.args.get(
            'new_name', 'change')  # {"data": null}
        # change_sql = 'UPDATE user SET name = %s WHERE username = %s', (g.username,)
        #search_sql = 'SELECT name FROM user where username = %s', (g.username,)

        cursor.execute(
            'UPDATE user SET name = %s WHERE username = %s', (change_name_api, g.username))
        print(
            f"change:  {'UPDATE user SET name= % s WHERE username = % s', (change_name_api, g.username)}")
        result = cursor.fetchone()
        print(f'change:  {change_name_api}')
        print(f'change result:  {result}')
        return '{"ok": true}'
    except:
        return '{"error": true}'


@ app.route('/member/', methods=['POST', 'GET'])
def member():
    # if request.method == 'POST' and 'username' in request.form:
    #     username = request.form.get('username')
    #     cursor.execute(
    #         'SELECT name FROM user WHERE username = %s', (username,))
    #     answer = cursor.fetchone()
    #     print(f"member{answer}")
    # print(f"http://127.0.0.1:3000/api/users?username={username}")
    return render_template('member.html', web_info=web_info)


if __name__ == '__main__':
    app.run(debug=True, port=3000)
