from django import forms
from common.models import User, Admin


class LoginForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['name', 'password']
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control', 'required': True, 'placeholder': '당신의 ID를 입력하세요...'}),
            'password': forms.PasswordInput(attrs={'class': 'form-control', 'required': True, 'placeholder': '비밀번호를 입력하세요...'}),
        }
        labels = {
            'name': '아이디',
            'password': '비밀번호',
        }


class RegisterForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['name', 'password', 'email']
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control'}),
            'password': forms.PasswordInput(attrs={'class': 'form-control'}),
            'email': forms.TextInput(attrs={'class': 'form-control'}),
        }
        labels = {
            'name': '아이디',
            'password': '비밀번호',
            'email': '이메일',
        }


class AdminLoginForm(forms.ModelForm):
    class Meta:
        model = Admin
        fields = ['name', 'password']
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control', 'required': True, 'placeholder': '당신의 ID를 입력하세요...'}),
            'password': forms.PasswordInput(attrs={'class': 'form-control', 'required': True, 'placeholder': '비밀번호를 입력하세요...'}),
        }
        labels = {
            'name': '아이디',
            'password': '비밀번호',
        }


class AdminRegisterForm(forms.ModelForm):
    class Meta:
        model = Admin
        fields = ['name', 'password', 'email']
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control'}),
            'password': forms.PasswordInput(attrs={'class': 'form-control'}),
            'email': forms.TextInput(attrs={'class': 'form-control'}),
        }
        labels = {
            'name': '아이디',
            'password': '비밀번호',
            'email': '이메일',
        }
